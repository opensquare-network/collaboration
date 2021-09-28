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
    snapshotHeight,
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

  if (snapshotHeight === undefined) {
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
    && choices.length > 0
    && choices.some(item => typeof item !== "string")
  ) {
    throw new HttpError(400, { choices: ["Choices must be array of string"] });
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
    snapshotHeight,
    data,
    address,
    signature,
    ctx.cid,
    ctx.pinHash,
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
    contentType
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

  ctx.body = await proposalService.postComment(
    proposalCid,
    content,
    contentType,
    data,
    address,
    signature,
    ctx.cid,
    ctx.pinHash,
  );
}

async function getComments(ctx) {
  const { page, pageSize } = extractPage(ctx);
  if (pageSize === 0 || page < 1) {
    ctx.status = 400;
    return;
  }

  const { chain, proposalId } = ctx.params;
  ctx.body = await proposalService.getComments(chain, proposalId, page, pageSize);
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
  } = data;

  if (!proposalCid) {
    throw new HttpError(400, { proposalCid: ["Proposal CID is missing"] });
  }

  if (!choice) {
    throw new HttpError(400, { choice: ["Choice is missing"] });
  }

  ctx.body = await proposalService.vote(
    proposalCid,
    choice,
    data,
    address,
    signature,
    ctx.cid,
    ctx.pinHash,
  );
}

module.exports = {
  createProposal,
  getProposals,
  getProposalById,
  postComment,
  vote,
  getComments,
};
