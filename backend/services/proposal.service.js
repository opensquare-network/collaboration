const { ObjectId } = require("mongodb");
const { safeHtml } = require("../utils/post");
const { PostTitleLengthLimitation } = require("../constants");
const { nextPostUid } = require("./status.service");
const {
  getProposalCollection,
  getVoteCollection,
  getCommentCollection,
  getDb,
} = require("../mongo");
const { HttpError } = require("../exc");
const { ContentType } = require("../constants");
const { getLatestHeight } = require("./chain.service");
const { getBlockHash } = require("../utils/polkadotApi");
const spaceServices = require("../spaces");


async function createProposal(
  space,
  title,
  content,
  contentType,
  choiceType,
  choices,
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

  const lastHeight = getLatestHeight(space);
  if (lastHeight && snapshotHeight > lastHeight) {
    throw new HttpError(400, "Snapshot height is not allow to larger than the current finalized height");
  }

  const postUid = await nextPostUid();

  const now = new Date();

  const proposalCol = await getProposalCollection();
  const result = await proposalCol.insertOne(
    {
      space,
      postUid,
      title,
      content: contentType === ContentType.Html ? safeHtml(content) : content,
      contentType,
      choiceType,
      choices,
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

async function getProposalBySpace(space, page, pageSize) {
  const q = { space };

  const proposalCol = await getProposalCollection();
  const total = await proposalCol.countDocuments(q);

  if (page === "last") {
    const totalPages = Math.ceil(total / pageSize);
    page = Math.max(totalPages, 1);
  }

  const proposals = await proposalCol.find(q)
    .sort({ lastActivityAt: -1 })
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .toArray();

  const db = await getDb();
  await Promise.all([
    db.lookupCount({
      from: "comment",
      for: proposals,
      as: "commentsCount",
      localField: "_id",
      foreignField: "proposal",
    }),
    db.lookupCount({
      from: "vote",
      for: proposals,
      as: "votesCount",
      localField: "_id",
      foreignField: "proposal",
    }),
  ]);

  return {
    items: proposals,
    total,
    page,
    pageSize,
  };
}

async function getProposalById(proposalId) {
  const q = {};
  if (ObjectId.isValid(proposalId)) {
    q._id = ObjectId(proposalId);
  } else {
    q.postUid = proposalId;
  }

  const proposalCol = await getProposalCollection();
  const proposal = await proposalCol.findOne(q);

  if (!proposal) {
    throw new HttpError(404, "Post not found");
  }

  return proposal;
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
  const proposalCol = await getProposalCollection();
  const proposal = await proposalCol.findOne({ cid: proposalCid });
  if (!proposal) {
    throw new HttpError(400, "Proposal not found.");
  }

  const commentCol = await getCommentCollection();
  const height = await commentCol.countDocuments({ proposal: proposal._id });

  const now = new Date();

  const newComment = {
    proposal: proposal._id,
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

  const updateResult = await proposalCol.updateOne(
    { cid: proposalCid },
    {
      $set: {
        lastActivityAt: new Date()
      }
    },
  );

  if (!updateResult.result.ok) {
    throw new HttpError(500, "Unable to update proposal last activity time");
  }

  return newCommentId;
}

async function getComments(proposalId, page, pageSize) {
  const q = { proposal: ObjectId(proposalId) };

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

async function vote(
  proposalCid,
  choice,
  data,
  address,
  signature,
  cid,
  pinHash,
) {
  const proposalCol = await getProposalCollection();
  const proposal = await proposalCol.findOne({ cid: proposalCid });
  if (!proposal) {
    throw new HttpError(400, "Proposal not found.");
  }

  if (!proposal.choices?.includes(choice)) {
    throw new HttpError(400, "Invalid vote choice");
  }

  const space = proposal.space;
  const spaceService = spaceServices[space];
  if (!spaceService) {
    throw new HttpError(500, "Unknown space name");
  }
  const api = await spaceService.getApi();
  const blockHash = await getBlockHash(api, proposal.snapshotHeight);
  const balance = await spaceService.balanceOf(api, blockHash, address);

  const voteCol = await getVoteCollection();
  const height = await voteCol.countDocuments({ proposal: proposal._id });

  const now = new Date();

  const result = await voteCol.findOneAndUpdate(
    {
      proposal: proposal._id,
      address,
    },
    {
      $set: {
        choice,
        data,
        signature,
        updatedAt: now,
        cid,
        pinHash,
        balance,
      },
      $setOnInsert: {
        height: height + 1,
        createdAt: now,
      }
    },
    {
      upsert: true,
      returnDocument: "after",
    },
  );

  if (!result.ok) {
    throw new HttpError(500, "Failed to create comment");
  }

  const updateResult = await proposalCol.updateOne(
    { cid: proposalCid },
    {
      $set: {
        lastActivityAt: new Date()
      }
    },
  );

  if (!updateResult.result.ok) {
    throw new HttpError(500, "Unable to update proposal last activity time");
  }

  return result.value?._id;
}

async function getVotes(proposalId, page, pageSize) {
  const q = { proposal: ObjectId(proposalId) };

  const voteCol = await getVoteCollection();
  const total = await voteCol.count(q);

  if (page === "last") {
    const totalPages = Math.ceil(total / pageSize);
    page = Math.max(totalPages, 1);
  }

  const votes = await voteCol.find(q)
    .sort({ createdAt: 1 })
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .toArray();

  return {
    items: votes,
    total,
    page,
    pageSize,
  };
}

module.exports = {
  createProposal,
  getProposalBySpace,
  getProposalById,
  postComment,
  getComments,
  vote,
  getVotes,
};
