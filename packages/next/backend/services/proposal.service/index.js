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
const { spaces: spaceServices } = require("../../spaces");
const { checkDelegation } = require("../../services/node.service");
const { getObjectBufAndCid, pinJsonToIpfsWithTimeout } = require("../ipfs.service");
const { toDecimal128, enhancedSqrtOfBalance } = require("../../utils");
const { calcPassing } = require("../biased-voting.service");
const { getApi, getBalanceFromNetwork } = require("../../services/node.service");

function getTotalIssuance(space) {
  if (["rmrk", "rmrk-curation"].includes(space)) {
    return "100000000000000000";
  } else if ("polarisdao" === space) {
    return "1000000000000000";
  }

  throw new HttpError(500, "getTotalIssuance: unsupported space " + space);
}

function getTotalIssuance(space) {
  if (["rmrk", "rmrk-curation"].includes(space)) {
    return "100000000000000000";
  } else if ("polarisdao" === space) {
    return "1000000000000000";
  }

  throw new HttpError(500, "getTotalIssuance: unsupported space " + space);
}

const calcWeights = (vote, decimals, voteThreshold) => {
  return {
    ...vote,
    weights: {
      balanceOf: vote.weights.balanceOf?.toString(),
      quadraticBalanceOf: enhancedSqrtOfBalance(vote.weights.balanceOf?.toString(), decimals, voteThreshold),
    },
  };
}

const addProposalStatus = (now) => (p) => ({
  ...p,
  status: now < p.startDate ? "pending" : now < p.endDate ? "active" : "closed",
});

async function pinData(data, address, signature, prefix) {
  const { buf, cid } = await getObjectBufAndCid({
    msg: JSON.stringify(data),
    address,
    signature,
    version: "1",
  });

  let pinHash = null;
  try {
    const pinResult = await pinJsonToIpfsWithTimeout(buf, cid, 3000, prefix);
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
  snapshotHeights,
  realProposer,
  proposerNetwork,
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

  const spaceService = spaceServices[space];
  if (!spaceService) {
    throw new HttpError(500, "Unknown space");
  }

  // Check if the snapshot heights is matching the space configuration
  const snapshotNetworks = Object.keys(snapshotHeights || {});
  if (snapshotNetworks.length === 0 || snapshotNetworks.length !== spaceService.networks.length) {
    throw new HttpError(400, {
      snapshotHeights: ["The snapshot heights must match the space configuration"],
    });
  }
  for (const spaceNetwork of spaceService.networks) {
    if (snapshotNetworks.includes(spaceNetwork.network)) {
      continue;
    }

    throw new HttpError(400, {
      snapshotHeights: [ `Missing snapshot height of ${network.network}` ],
    });
  }

  for (const chain in snapshotHeights) {
    const lastHeight = getLatestHeight(chain);
    if (lastHeight && snapshotHeights[chain] > lastHeight) {
      throw new HttpError(400, `Snapshot height should not be higher than the current finalized height: ${chain}`);
    }
  }

  const networksConfig = {
    symbol: spaceService.symbol,
    decimals: spaceService.decimals,
    networks: spaceService.networks,
  };

  const weightStrategy = spaceService.weightStrategy;

  const api = await getApi(proposerNetwork);
  const lastHeight = getLatestHeight(proposerNetwork);

  if (realProposer && realProposer !== address) {
    await checkDelegation(api, address, realProposer, lastHeight);
  }

  const proposer = realProposer || address;

  const creatorBalance = await getBalanceFromNetwork(
    api,
    {
      networksConfig,
      networkName: proposerNetwork,
      address: proposer,
      blockHeight: lastHeight,
    }
  );

  const bnCreatorBalance = new BigNumber(creatorBalance);
  if (bnCreatorBalance.lt(spaceService.proposeThreshold)) {
    throw new HttpError(403, `Balance is not enough to create the proposal`);
  }

  const { cid, pinHash } = await pinData(data, address, signature, "voting-proposal-");

  const postUid = await nextPostUid();

  const proposalCol = await getProposalCollection();
  const result = await proposalCol.insertOne(
    {
      space,
      networksConfig,
      postUid,
      title,
      content: contentType === ContentType.Html ? safeHtml(content) : content,
      contentType,
      choiceType,
      choices: uniqueChoices,
      startDate,
      endDate,
      snapshotHeights,
      weightStrategy,
      proposer,
      proposerNetwork,
      data,
      address,
      signature,
      lastActivityAt: new Date(),
      createdAt: now,
      updatedAt: now,
      cid,
      pinHash,
      version: "2",
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

async function getProposalSpace(proposal) {
  const spaceService = spaceServices[proposal.space]
  if (!spaceService) {
    throw new HttpError(500, "Unkown space");
  }
  return spaceService;
}

async function getProposalSpaceByCid(proposalCid) {
  const proposalCol = await getProposalCollection();
  const proposal = await proposalCol.findOne({ cid: proposalCid });
  if (!proposal) {
    throw new HttpError(404, "Proposal does not exists");
  }
  const spaceService = spaceServices[proposal.space]
  if (!spaceService) {
    throw new HttpError(500, "Unkown space");
  }
  return spaceService;
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

  const spaceService = spaceServices[proposal.space]
  if (!spaceService) {
    throw new HttpError(500, "Unkown space");
  }
  const voteThreshold = spaceService.voteThreshold;
  const decimals = spaceService.decimals;

  const voteCol = await getVoteCollection();
  const votesCount = await voteCol.countDocuments({ proposal: proposal._id });

  const votes = await voteCol.find({ proposal: proposal._id }).toArray();
  const calculatedVotes = votes.map(v => calcWeights(v, decimals, voteThreshold));
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
  commenterNetwork,
  data,
  address,
  signature,
) {
  const proposalCol = await getProposalCollection();
  const proposal = await proposalCol.findOne({ cid: proposalCid });
  if (!proposal) {
    throw new HttpError(400, "Proposal not found.");
  }

  const snapshotNetworks = Object.keys(proposal.snapshotHeights);
  if (!snapshotNetworks.includes(commenterNetwork)) {
    throw new HttpError(400, "Commenter network is not supported by this proposal");
  }

  const { cid, pinHash } = await pinData(data, address, signature, "voting-comment-");

  const commentCol = await getCommentCollection();
  const height = await commentCol.countDocuments({ proposal: proposal._id });

  const now = new Date();

  const newComment = {
    proposal: proposal._id,
    content: contentType === ContentType.Html ? safeHtml(content) : content,
    contentType,
    commenterNetwork,
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

async function getComments(proposalCid, page, pageSize) {
  const proposalCol = await getProposalCollection();
  const proposal = await proposalCol.findOne({ cid: proposalCid });
  if (!proposal) {
    throw new HttpError(404, "Proposal does not exists");
  }
  const q = { proposal: proposal?._id };

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
  voterNetwork,
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
    throw new HttpError(500, "Unknown space");
  }

  const snapshotNetworks = Object.keys(proposal.snapshotHeights);
  if (!snapshotNetworks.includes(voterNetwork)) {
    throw new HttpError(400, "Voter network is not supported by this proposal");
  }

  const api = await getApi(voterNetwork);
  if (realVoter && realVoter !== address) {
    const snapshotHeight = proposal.snapshotHeights?.[voterNetwork];
    await checkDelegation(api, address, realVoter, snapshotHeight);
  }

  const voter = realVoter || address;

  const balanceOf = await getBalanceFromNetwork(
    api,
    {
      networksConfig: proposal.networksConfig,
      networkName: voterNetwork,
      address: voter,
      blockHeight: proposal.snapshotHeights?.[voterNetwork],
    }
  );
  if (new BigNumber(balanceOf).lt(spaceService.voteThreshold)) {
    const symbolVoteThreshold = new BigNumber(spaceService.voteThreshold).div(Math.pow(10, spaceService.decimals)).toString();
    throw new HttpError(400, `Require the minimum of ${symbolVoteThreshold} ${spaceService.symbol} to vote`);
  }
  const { cid, pinHash } = await pinData(data, address, signature, "voting-vote-");

  const voteCol = await getVoteCollection();
  const result = await voteCol.findOneAndUpdate(
    {
      proposal: proposal._id,
      voter,
      voterNetwork,
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
        version: "2",
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
    throw new HttpError(500, "Failed to create vote");
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

async function getVotes(proposalCid, page, pageSize) {
  const proposalCol = await getProposalCollection();
  const proposal = await proposalCol.findOne({ cid: proposalCid });
  const q = { proposal: proposal?._id };

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

  const spaceService = await getProposalSpace(proposal);

  return {
    items: votes.map(v => calcWeights(v, spaceService.decimals, spaceService.voteThreshold)),
    total,
    page,
    pageSize,
  };
}

async function getAddressVote(proposalCid, address) {
  const q = {
    "data.proposalCid": proposalCid,
    voter: address,
  };

  const spaceService = await getProposalSpaceByCid(proposalCid);

  const voteCol = await getVoteCollection();
  const vote = await voteCol.findOne(q);
  return vote ? calcWeights(vote, spaceService.decimals, spaceService.voteThreshold) : vote;
}

async function getStats(proposalCid) {
  const proposalCol = await getProposalCollection();
  const proposal = await proposalCol.findOne({ cid: proposalCid });
  const q = { proposal: proposal?._id };

  const spaceService = await getProposalSpace(proposal);

  const voteCol = await getVoteCollection();
  const votes = await voteCol.find(q).toArray();
  const calculatedVotes = votes.map(v => calcWeights(v, spaceService.decimals, spaceService.voteThreshold));
  const stats = Object
    .fromEntries(
      proposal.choices.map(choice =>
        [
          choice,
          {
            choice,
            balanceOf: "0",
            quadraticBalanceOf: "0",
            votesCount: 0,
          }
        ]
      )
  );
  for (const vote of calculatedVotes) {
    const weights = stats[vote.choice] = stats[vote.choice] || { choice: vote.choice };
    weights.balanceOf = new BigNumber(weights.balanceOf || 0).plus(vote.weights.balanceOf).toString();
    weights.quadraticBalanceOf = new BigNumber(weights.quadraticBalanceOf || 0).plus(vote.weights.quadraticBalanceOf).toString();
    weights.votesCount = (weights.votesCount || 0) + 1;
  }

  if (
    ["rmrk", "rmrk-curation", "polarisdao"].includes(proposal.space) &&
    proposal.choices?.length === 2 &&
    proposal.weightStrategy?.includes("biased-voting")
  ) {
    let totalIssuance = getTotalIssuance(proposal.space);
    calcBiasedVotingResult(proposal, stats, totalIssuance);
  }

  return Object.values(stats);
}

function calcBiasedVotingResult(proposal, stats, totalIssuance) {
  const ayeChoice = stats[proposal.choices[0]] || {};
  const nayChoice = stats[proposal.choices[1]] || {};

  const superMajorityApprove = calcPassing(
    ayeChoice.balanceOf || 0,
    nayChoice.balanceOf || 0,
    "SuperMajorityApprove",
    totalIssuance,
  );
  const superMajorityAgainst = calcPassing(
    ayeChoice.balanceOf || 0,
    nayChoice.balanceOf || 0,
    "SuperMajorityAgainst",
    totalIssuance,
  );

  ayeChoice.biasedVoting = {
    superMajorityApprove,
    superMajorityAgainst,
  };
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
    .limit(10)
    .toArray();

  const addStatus = addProposalStatus(now);

  return proposals.map(addStatus);
}

async function getVoterBalance(proposalCid, network, address, snapshot) {
  const proposalCol = await getProposalCollection();
  const proposal = await proposalCol.findOne({ cid: proposalCid });
  if (!proposal) {
    throw new HttpError(404, "Proposal does not exists");
  }
  const networksConfig = proposal.networksConfig;

  const blockHeight = snapshot ? parseInt(snapshot) : getLatestHeight(network);
  const api = await getApi(network);
  const totalBalance = await getBalanceFromNetwork(
    api,
    {
      networksConfig,
      networkName: network,
      address,
      blockHeight,
    }
  );
  ctx.body = {
    balance: totalBalance
  };
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
  getVoterBalance,
};
