const { ObjectId } = require("mongodb");
const { safeHtml } = require("../utils/post");
const { PostTitleLengthLimitation } = require("../constants");
const { nextPostUid } = require("./status.service");
const {
  getPostCollection,
  getCommentCollection,
  getReactionCollection,
  getDb,
} = require("../mongo");
const { HttpError } = require("../exc");
const { ContentType } = require("../constants");

async function createPost(
  space,
  title,
  content,
  contentType,
  address,
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
      address,
      lastActivityAt: new Date(),
      createdAt: now,
      updatedAt: now,
    }
  );

  if (!result.result.ok) {
    throw new HttpError(500, "Failed to create post");
  }

  return postUid;
}

async function updatePost(
  postId,
  title,
  content,
  contentType,
  address
) {
  const postObjId = ObjectId(postId);
  const postCol = await getPostCollection();
  const post = await postCol.findOne({ _id: postObjId });
  if (!post) {
    throw new HttpError(404, "Post does not exists");
  }

  if (!post.address === address) {
    throw new HttpError(403, "You are not the post author");
  }

  if (title.length > PostTitleLengthLimitation) {
    throw new HttpError(400, {
      title: [ "Title must be no more than %d characters" ],
    });
  }

  const now = new Date();

  const result = await postCol.updateOne(
    { _id: postObjId },
    {
      $set: {
        title,
        content: contentType === ContentType.Html ? safeHtml(content) : content,
        contentType,
        updatedAt: now,
        lastActivityAt: now,
      }
    }
  );

  if (!result.result.ok) {
    throw new HttpError(500, "Failed to update post");
  }

  return true;
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

async function setPostReaction(postId, reaction, address) {
  const postObjId = ObjectId(postId);

  const postCol = await getPostCollection();
  const post = await postCol.findOne({
    _id: postObjId,
    address: { $ne: address },
  });
  if (!post) {
    throw new HttpError(400, "Cannot set reaction.");
  }

  const reactionCol = await getReactionCollection();

  const now = new Date();
  const result = await reactionCol.updateOne(
    {
      post: postObjId,
      address,
    },
    {
      $set: {
        reaction,
        updatedAt: now,
      },
      $setOnInsert: {
        createdAt: now,
      },
    },
    { upsert: true }
  );

  if (!result.result.ok) {
    throw new HttpError(500, "Db error, update reaction.");
  }

  return true;
}

async function unsetPostReaction(postId, address) {
  const postObjId = ObjectId(postId);

  const reactionCol = await getReactionCollection();

  const result = await reactionCol.deleteOne({
    post: postObjId,
    address,
  });

  if (!result.result.ok) {
    throw new HttpError(500, "Db error, clean reaction.");
  }

  if (result.result.nModified === 0) {
    return false;
  }

  return true;
}

async function postComment(
  postId,
  content,
  contentType,
  address,
) {
  const postObjId = ObjectId(postId);

  const postCol = await getPostCollection();
  const post = await postCol.findOne({_id: postObjId});
  if (!post) {
    throw new HttpError(400, "Post not found.");
  }

  const commentCol = await getCommentCollection();
  const height = await commentCol.countDocuments({ post: postObjId });

  const now = new Date();

  const newComment = {
    post: postObjId,
    content: contentType === ContentType.Html ? safeHtml(content) : content,
    contentType,
    address,
    height: height + 1,
    createdAt: now,
    updatedAt: now,
  };
  const result = await commentCol.insertOne(newComment);

  if (!result.result.ok) {
    throw new HttpError(500, "Failed to create comment");
  }

  const newCommentId = result.ops[0]._id;

  const updatePostResult = await postCol.updateOne(
    { _id: postObjId },
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

  const db = await getDb();
  await db.lookupMany({
    from: "reaction",
    for: comments,
    as: "reactions",
    localField: "_id",
    foreignField: "comment",
  });

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
  updatePost,
  setPostReaction,
  unsetPostReaction,
  postComment,
  getComments,
};
