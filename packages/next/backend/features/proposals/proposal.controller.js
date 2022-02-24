const { HttpError } = require("../../exc");
const proposalService = require("../../services/proposal.service");
const { ContentType, ChoiceType } = require("../../constants");
const { extractPage } = require("../../utils");

async function createProposal(ctx) {
  const {
    data,
    address,
    signature,
  } = ctx.request.body;
  const {
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
  } = data;

  if (!title) {
    throw new HttpError(400, { title: ["Title is missing"] });
  }

  if (!content) {
    throw new HttpError(400, { content: ["Content is missing"] });
  }

  if (!choiceType) {
    throw new HttpError(400, { content: ["Choice type is missing"] });
  }

  if (!startDate) {
    throw new HttpError(400, { content: ["Start date is missing"] });
  }

  if (!endDate) {
    throw new HttpError(400, { content: ["End date is missing"] });
  }

  if (!snapshotHeights) {
    throw new HttpError(400, { content: ["Snapshot height is missing"] });
  }

  if (choiceType !== ChoiceType.Single) {
    throw new HttpError(400, { choiceType: ["Unknown choice type"] });
  }

  if (!choices) {
    throw new HttpError(400, { choices: ["Choices is missing"] });
  }

  if (
    !Array.isArray(choices)
    || choices.length < 2
    || choices.some(item => typeof item !== "string")
  ) {
    throw new HttpError(400, { choices: ["Choices must be array of string with at least 2 items"] });
  }

  if (new Set(choices).size < choices.length) {
    throw new HttpError(400, { choices: ["All choices should be different"] });
  }

  if (!proposerNetwork) {
    throw new HttpError(400, { proposerNetwork: ["Proposer network is missing"] });
  }

  if (
    contentType !== ContentType.Markdown &&
    contentType !== ContentType.Html
  ) {
    throw new HttpError(400, { contentType: ["Unknown content type"] });
  }

  ctx.body = await proposalService.createProposal(
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
  );
}

async function getProposals(ctx) {
  const { space } = ctx.params;

  const { page, pageSize } = extractPage(ctx);
  if (pageSize === 0 || page < 1) {
    ctx.status = 400;
    return;
  }

  ctx.body = await proposalService.getProposalBySpace(space, page, pageSize);
}

async function getPendingProposals(ctx) {
  const { space } = ctx.params;

  const { page, pageSize } = extractPage(ctx);
  if (pageSize === 0 || page < 1) {
    ctx.status = 400;
    return;
  }

  ctx.body = await proposalService.getPendingProposalBySpace(space, page, pageSize);
}

async function getActiveProposals(ctx) {
  const { space } = ctx.params;

  const { page, pageSize } = extractPage(ctx);
  if (pageSize === 0 || page < 1) {
    ctx.status = 400;
    return;
  }

  ctx.body = await proposalService.getActiveProposalBySpace(space, page, pageSize);
}

async function getClosedProposals(ctx) {
  const { space } = ctx.params;

  const { page, pageSize } = extractPage(ctx);
  if (pageSize === 0 || page < 1) {
    ctx.status = 400;
    return;
  }

  ctx.body = await proposalService.getClosedProposalBySpace(space, page, pageSize);
}

async function getProposalById(ctx) {
  const { proposalId } = ctx.params;

  ctx.body = await proposalService.getProposalById(proposalId);
}

async function postComment(ctx) {
  const {
    data,
    address,
    signature,
  } = ctx.request.body;
  const {
    proposalCid,
    content,
    contentType,
    commenterNetwork,
  } = data;

  if (!content) {
    throw new HttpError(400, { content: ["Comment content is missing"] });
  }

  if (
    contentType !== ContentType.Markdown &&
    contentType !== ContentType.Html
  ) {
    throw new HttpError(400, { contentType: ["Unknown content type"] });
  }

  if (!commenterNetwork) {
    throw new HttpError(400, { commenterNetwork: ["Commenter network is missing"] });
  }

  ctx.body = await proposalService.postComment(
    proposalCid,
    content,
    contentType,
    commenterNetwork,
    data,
    address,
    signature,
  );
}

async function getComments(ctx) {
  const { page, pageSize } = extractPage(ctx);
  if (pageSize === 0 || page < 1) {
    ctx.status = 400;
    return;
  }

  const { proposalCid } = ctx.params;
  ctx.body = await proposalService.getComments(proposalCid, page, pageSize);
}

async function vote(ctx) {
  const {
    data,
    address,
    signature,
  } = ctx.request.body;
  const {
    proposalCid,
    choice,
    remark,
    realVoter,
    voterNetwork,
  } = data;

  if (!proposalCid) {
    throw new HttpError(400, { proposalCid: ["Proposal CID is missing"] });
  }

  if (!choice) {
    throw new HttpError(400, { choice: ["Choice is missing"] });
  }

  if (!voterNetwork) {
    throw new HttpError(400, { voterNetwork: ["Voter network is missing"] });
  }

  ctx.body = await proposalService.vote(
    proposalCid,
    choice,
    remark,
    realVoter,
    data,
    address,
    voterNetwork,
    signature,
  );
}

async function getVotes(ctx) {
  const { page, pageSize } = extractPage(ctx);
  if (pageSize === 0 || page < 1) {
    ctx.status = 400;
    return;
  }

  const { proposalCid } = ctx.params;
  ctx.body = await proposalService.getVotes(proposalCid, page, pageSize);
}

async function getAddressVote(ctx) {
  const { proposalCid, address } = ctx.params;

  ctx.body = await proposalService.getAddressVote(proposalCid, address);
}

async function getStats(ctx) {
  const { proposalCid } = ctx.params;
  ctx.body = await proposalService.getStats(proposalCid);
}

async function getVoterBalance(ctx) {
  const { proposalCid, network, address } = ctx.params;
  const { snapshot } = ctx.query;

  if (snapshot && !/^[0-9]*$/.test(snapshot)) {
    throw new HttpError(400, "Invalid snapshot number");
  }

  if (!isAddress(address)) {
    throw new HttpError(400, "Invalid address");
  }

  ctx.body = await proposalService.getVoterBalance(proposalCid, network, address, snapshot);
}

module.exports = {
  createProposal,
  getProposals,
  getPendingProposals,
  getActiveProposals,
  getClosedProposals,
  getProposalById,
  postComment,
  vote,
  getComments,
  getVotes,
  getAddressVote,
  getStats,
  getVoterBalance,
};
