const { ObjectId } = require("mongodb");
const { safeHtml } = require("../utils/post");
const { PostTitleLengthLimitation } = require("../constants");
const { nextPostUid } = require("./status.service");
const {
  getPostCollection,
  getCommentCollection,
  getDb,
} = require("../mongo");
const { HttpError } = require("../exc");
const { ContentType } = require("../constants");

async function createPost(
  space,
  title,
  content,
  contentType,
  choiceType,
  startDate,
  endDate,
  snapshotHeight,
  data,
  address,
  signature,
  cid,
  pinHash,
) {
  if (title.length > PostTitleLengthLimitation) {
    throw new HttpError(400, {
      title: [ "Title must be no more than %d characters" ],
    });
  }

  const postUid = await nextPostUid();

  const now = new Date();

  const postCol = await getPostCollection();
  const result = await postCol.insertOne(
    {
      space,
      postUid,
      title,
      content: contentType === ContentType.Html ? safeHtml(content) : content,
      contentType,
      choiceType,
      startDate,
      endDate,
      snapshotHeight,
      data,
      address,
      signature,
      lastActivityAt: new Date(),
      createdAt: now,
      updatedAt: now,
      cid,
      pinHash,
    }
  );

  if (!result.result.ok) {
    throw new HttpError(500, "Failed to create post");
  }

  return postUid;
}

async function getPostsBySpace(space, page, pageSize) {
  const postCol = await getPostCollection();
  const total = await postCol.countDocuments();

  if (page === "last") {
    const totalPages = Math.ceil(total / pageSize);
    page = Math.max(totalPages, 1);
  }

  const posts = await postCol.find({ space })
    .sort({ lastActivityAt: -1 })
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .toArray();

  const db = await getDb();
  await Promise.all([
    db.lookupCount({
      from: "comment",
      for: posts,
      as: "commentsCount",
      localField: "_id",
      foreignField: "post",
    }),
  ]);

  return {
    items: posts,
    total,
    page,
    pageSize,
  };
}

async function getPostById(postId) {
  const q = {};
  if (ObjectId.isValid(postId)) {
    q._id = ObjectId(postId);
  } else {
    q.postUid = postId;
  }

  const postCol = await getPostCollection();
  const post = await postCol.findOne(q);

  if (!post) {
    throw new HttpError(404, "Post not found");
  }

  const db = await getDb();
  await db.lookupMany({
    from: "reaction",
    for: post,
    as: "reactions",
    localField: "_id",
    foreignField: "post",
  });

  return post;
}

async function postComment(
  proposalCid,
  content,
  contentType,
  data,
  address,
  signature,
  cid,
  pinHash,
) {
  const postCol = await getPostCollection();
  const post = await postCol.findOne({ cid: proposalCid });
  if (!post) {
    throw new HttpError(400, "Proposal not found.");
  }

  const commentCol = await getCommentCollection();
  const height = await commentCol.countDocuments({ post: post._id });

  const now = new Date();

  const newComment = {
    post: post._id,
    content: contentType === ContentType.Html ? safeHtml(content) : content,
    contentType,
    data,
    address,
    signature,
    height: height + 1,
    createdAt: now,
    updatedAt: now,
    cid,
    pinHash,
  };
  const result = await commentCol.insertOne(newComment);

  if (!result.result.ok) {
    throw new HttpError(500, "Failed to create comment");
  }

  const newCommentId = result.ops[0]._id;

  const updatePostResult = await postCol.updateOne(
    { cid: proposalCid },
    {
      $set: {
        lastActivityAt: new Date()
      }
    },
  );

  if (!updatePostResult.result.ok) {
    throw new HttpError(500, "Unable to udpate post last activity time");
  }

  return newCommentId;
}

async function getComments(postId, page, pageSize) {
  const q = { post: ObjectId(postId) };

  const commentCol = await getCommentCollection();
  const total = await commentCol.count(q);

  if (page === "last") {
    const totalPages = Math.ceil(total / pageSize);
    page = Math.max(totalPages, 1);
  }

  const comments = await commentCol.find(q)
    .sort({ createdAt: 1 })
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .toArray();

  return {
    items: comments,
    total,
    page,
    pageSize,
  };
}

module.exports = {
  createPost,
  getPostsBySpace,
  getPostById,
  postComment,
  getComments,
};
