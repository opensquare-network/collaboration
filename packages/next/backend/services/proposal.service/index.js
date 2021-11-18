const { ObjectId } = require("mongodb");
const BigNumber = require("bignumber.js");
const { safeHtml } = require("../../utils/post");
const { PostTitleLengthLimitation } = require("../../constants");
const { nextPostUid } = require("../status.service");
const {
  getProposalCollection,
  getVoteCollection,
  getCommentCollection,
} = require("../../mongo");
const { HttpError } = require("../../exc");
const { ContentType } = require("../../constants");
const { getLatestHeight } = require("../chain.service");
const spaceServices = require("../../spaces");
const { checkDelegation, getTotalBalance } = require("../../services/node.service");
const { getObjectBufAndCid, pinJsonToIpfsWithTimeout } = require("../ipfs.service");
const { toDecimal128, sqrtOfBalance } = require("../../utils");

const calcWeights = (vote) => {
  return {
    ...vote,
    weights: {
      balanceOf: vote.weights.balanceOf?.toString(),
      quadraticBalanceOf: sqrtOfBalance(vote.weights.balanceOf?.toString()),
    },
  };
}

const addProposalStatus = (now) => (p) => ({
  ...p,
  status: now < p.startDate ? "pending" : now < p.endDate ? "active" : "closed",
});

async function pinData(data, address, signature) {
  const { buf, cid } = await getObjectBufAndCid({
    msg: JSON.stringify(data),
    address,
    signature,
    version: "1",
  });

  let pinHash = null;
  try {
    const pinResult = await pinJsonToIpfsWithTimeout(buf, cid, 3000);
    pinHash = pinResult.PinHash ?? null;
  } catch (e) {
    console.error(e);
  }

  return { cid, pinHash };
}

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
) {
  if (title.length > PostTitleLengthLimitation) {
    throw new HttpError(400, {
      title: [ "Title must be no more than %d characters" ],
    });
  }

  if (endDate <= startDate) {
    throw new HttpError(400, "Start date should not be larger than end date");
  }

  const now = new Date();

  if (endDate < now.getTime()) {
    throw new HttpError(400, "End date should not be earlier than current time");
  }

  const uniqueChoices = Array.from(new Set(choices));
  if (uniqueChoices.length < 2) {
    throw new HttpError(400, { choices: ["There must be at least 2 different choices"] });
  }

  const lastHeight = getLatestHeight(space);
  if (lastHeight && snapshotHeight > lastHeight) {
    throw new HttpError(400, "Snapshot height should not be higher than the current finalized height");
  }

  const spaceService = spaceServices[space];
  if (!spaceService) {
    throw new HttpError(500, "Unknown space name");
  }
  const weightStrategy = spaceService.weightStrategy;

  const api = await spaceService.getApi();
  const creatorBalance = await getTotalBalance(api, lastHeight, address);
  const bnCreatorBalance = new BigNumber(creatorBalance);
  if (bnCreatorBalance.lt(spaceService.proposeThreshold)) {
    throw new HttpError(403, `Balance is not enough to create the proposal`);
  }

  const { cid, pinHash } = await pinData(data, address, signature);

  const postUid = await nextPostUid();

  const proposalCol = await getProposalCollection();
  const result = await proposalCol.insertOne(
    {
      space,
      postUid,
      title,
      content: contentType === ContentType.Html ? safeHtml(content) : content,
      contentType,
      choiceType,
      choices: uniqueChoices,
      startDate,
      endDate,
      snapshotHeight,
      weightStrategy,
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

  if (!result.insertedId) {
    throw new HttpError(500, "Failed to create post");
  }

  return {
    cid,
    postUid,
  };
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

  const now = Date.now();
  const addStatus = addProposalStatus(now);

  return {
    items: proposals.map(addStatus),
    total,
    page,
    pageSize,
  };
}

async function getPendingProposalBySpace(space, page, pageSize) {
  const now = Date.now();
  const q = {
    space,
    startDate: { $gt: now }
  };

  const proposalCol = await getProposalCollection();
  const total = await proposalCol.countDocuments(q);

  if (page === "last") {
    const totalPages = Math.ceil(total / pageSize);
    page = Math.max(totalPages, 1);
  }

  const proposals = await proposalCol.find(q)
    .sort({ startDate: 1 })
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .toArray();

  const addStatus = addProposalStatus(now);

  return {
    items: proposals.map(addStatus),
    total,
    page,
    pageSize,
  };
}

async function getActiveProposalBySpace(space, page, pageSize) {
  const now = Date.now();
  const q = {
    space,
    startDate: { $lte: now },
    endDate: { $gt: now }
  };

  const proposalCol = await getProposalCollection();
  const total = await proposalCol.countDocuments(q);

  if (page === "last") {
    const totalPages = Math.ceil(total / pageSize);
    page = Math.max(totalPages, 1);
  }

  const proposals = await proposalCol.find(q)
    .sort({ endDate: 1 })
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .toArray();

  const addStatus = addProposalStatus(now);

  return {
    items: proposals.map(addStatus),
    total,
    page,
    pageSize,
  };
}

async function getClosedProposalBySpace(space, page, pageSize) {
  const now = Date.now();
  const q = {
    space,
    endDate: { $lte: now }
  };

  const proposalCol = await getProposalCollection();
  const total = await proposalCol.countDocuments(q);

  if (page === "last") {
    const totalPages = Math.ceil(total / pageSize);
    page = Math.max(totalPages, 1);
  }

  const proposals = await proposalCol.find(q)
    .sort({ endDate: -1 })
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .toArray();

  const addStatus = addProposalStatus(now);

  return {
    items: proposals.map(addStatus),
    total,
    page,
    pageSize,
  };
}

async function getProposalById(proposalId) {
  const q = {};
  if (ObjectId.isValid(proposalId)) {
    q._id = ObjectId(proposalId);
  } else if (proposalId.match(/^[0-9]+$/)) {
    q.postUid = proposalId;
  } else {
    q.cid = proposalId;
  }

  const proposalCol = await getProposalCollection();
  const proposal = await proposalCol.findOne(q);

  if (!proposal) {
    throw new HttpError(404, "Post not found");
  }

  const voteCol = await getVoteCollection();
  const votesCount = await voteCol.countDocuments({ proposal: proposal._id });

  const votes = await voteCol.find({ proposal: proposal._id }).toArray();
  const calculatedVotes = votes.map(calcWeights);
  const votedWeights = {};
  for (const vote of calculatedVotes) {
    votedWeights.balanceOf = new BigNumber(votedWeights.balanceOf || 0).plus(vote.weights.balanceOf).toString();
    votedWeights.quadraticBalanceOf = new BigNumber(votedWeights.quadraticBalanceOf || 0).plus(vote.weights.quadraticBalanceOf).toString();
  }
  proposal.votesCount = votesCount;
  proposal.votedWeights = votedWeights;

  const now = Date.now();
  const addStatus = addProposalStatus(now);

  return addStatus(proposal);
}

async function postComment(
  proposalCid,
  content,
  contentType,
  data,
  address,
  signature,
) {
  const proposalCol = await getProposalCollection();
  const proposal = await proposalCol.findOne({ cid: proposalCid });
  if (!proposal) {
    throw new HttpError(400, "Proposal not found.");
  }

  const { cid, pinHash } = await pinData(data, address, signature);

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

  if (!result.insertedId) {
    throw new HttpError(500, "Failed to create comment");
  }

  const newCommentId = result.insertedId;

  await proposalCol.updateOne(
    { cid: proposalCid },
    {
      $set: {
        lastActivityAt: new Date()
      }
    },
  );

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
  remark,
  realVoter,
  data,
  address,
  signature,
) {
  const proposalCol = await getProposalCollection();
  const proposal = await proposalCol.findOne({ cid: proposalCid });
  if (!proposal) {
    throw new HttpError(400, "Proposal not found.");
  }

  if (!proposal.choices?.includes(choice)) {
    throw new HttpError(400, "Invalid vote choice");
  }

  const now = new Date();

  if (proposal.startDate > now.getTime()) {
    throw new HttpError(400, "The voting is not started yet");
  }

  if (proposal.endDate < now.getTime()) {
    throw new HttpError(400, "The voting had already ended");
  }

  const space = proposal.space;
  const spaceService = spaceServices[space];
  if (!spaceService) {
    throw new HttpError(500, "Unknown space name");
  }
  const api = await spaceService.getApi();

  if (realVoter && realVoter !== address) {
    await checkDelegation(api, address, realVoter, proposal.snapshotHeight);
  }

  const voter = realVoter || address;

  const balanceOf = await getTotalBalance(api, proposal.snapshotHeight, voter);
  if (new BigNumber(balanceOf).isZero()) {
    throw new HttpError(400, "In order to vote, the account balance cannot be 0");
  }
  const { cid, pinHash } = await pinData(data, address, signature);

  const voteCol = await getVoteCollection();
  const result = await voteCol.findOneAndUpdate(
    {
      proposal: proposal._id,
      voter,
    },
    {
      $set: {
        choice,
        remark,
        data,
        address,
        signature,
        updatedAt: now,
        cid,
        pinHash,
        weights: {
          balanceOf: toDecimal128(balanceOf),
        },
      },
      $setOnInsert: {
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

  await proposalCol.updateOne(
    { cid: proposalCid },
    {
      $set: {
        lastActivityAt: new Date()
      }
    },
  );

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
    items: votes.map(calcWeights),
    total,
    page,
    pageSize,
  };
}

async function getAddressVote(proposalId, address) {
  const q = {
    proposal: ObjectId(proposalId),
    voter: address,
  };

  const voteCol = await getVoteCollection();
  const vote = await voteCol.findOne(q);
  return calcWeights(vote);
}

async function getStats(proposalId) {
  const q = { proposal: ObjectId(proposalId) };

  const voteCol = await getVoteCollection();
  const votes = await voteCol.find(q).toArray();
  const calculatedVotes = votes.map(calcWeights);
  const stats = {};
  for (const vote of calculatedVotes) {
    const weights = stats[vote.choice] = stats[vote.choice] || { choice: vote.choice };
    weights.balanceOf = new BigNumber(weights.balanceOf || 0).plus(vote.weights.balanceOf);
    weights.quadraticBalanceOf = new BigNumber(weights.quadraticBalanceOf || 0).plus(vote.weights.quadraticBalanceOf);
  }

  return Object.values(stats);
}

async function getHottestProposals() {
  const now = Date.now();
  const q = {
    startDate: { $lte: now },
    endDate: { $gt: now }
  };

  const proposalCol = await getProposalCollection();
  const proposals = await proposalCol
    .find(q, { sort: { lastActivityAt: -1 } })
    .limit(5)
    .toArray();

  const addStatus = addProposalStatus(now);

  return proposals.map(addStatus);
}

module.exports = {
  createProposal,
  getProposalBySpace,
  getPendingProposalBySpace,
  getActiveProposalBySpace,
  getClosedProposalBySpace,
  getProposalById,
  postComment,
  getComments,
  vote,
  getVotes,
  getAddressVote,
  getStats,
  getHottestProposals,
};
