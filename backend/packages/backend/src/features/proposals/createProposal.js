const { HttpError } = require("../../exc");
const proposalService = require("../../services/proposal.service");
const { ChoiceType } = require("../../constants");
const isEmpty = require("lodash.isempty");
const { spaces: spaceServices } = require("../../spaces");
const { Accessibility } = require("../../consts/space");
const { checkProposalContent } = require("./checkProposalContent");

function checkProposalChoices(data) {
  const { choiceType, choices } = data;

  if (!choiceType) {
    throw new HttpError(400, { content: ["Choice type is missing"] });
  }

  if (![ChoiceType.Single, ChoiceType.Multiple].includes(choiceType)) {
    throw new HttpError(400, { choiceType: ["Unknown choice type"] });
  }

  if (!choices) {
    throw new HttpError(400, { choices: ["Choices is missing"] });
  }

  if (
    !Array.isArray(choices) ||
    choices.length < 2 ||
    choices.some((item) => typeof item !== "string")
  ) {
    throw new HttpError(400, {
      choices: ["Choices must be array of string with at least 2 items"],
    });
  }

  if (new Set(choices).size < choices.length) {
    throw new HttpError(400, { choices: ["All choices should be different"] });
  }
}

function checkProposalDate(data) {
  const { startDate, endDate } = data;

  if (!startDate) {
    throw new HttpError(400, { content: ["Start date is missing"] });
  }

  if (!endDate) {
    throw new HttpError(400, { content: ["End date is missing"] });
  }
}

function checkProposalOptions(data) {
  const { networksConfig, snapshotHeights, proposerNetwork } = data;

  if (!snapshotHeights) {
    throw new HttpError(400, { content: ["Snapshot height is missing"] });
  }

  if (isEmpty(networksConfig)) {
    throw new HttpError(400, {
      networksConfig: ["Networks config is missing"],
    });
  }

  if (!proposerNetwork) {
    throw new HttpError(400, {
      proposerNetwork: ["Proposer network is missing"],
    });
  }

  checkProposalContent(data);

  checkProposalDate(data);

  checkProposalChoices(data);
}

async function createProposal(ctx) {
  const { data, address, signature } = ctx.request.body;
  const {
    space,
    networksConfig,
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
    banner,
  } = data;

  if (!space) {
    throw new HttpError(400, { space: ["Space is missing"] });
  }

  const spaceConfig = spaceServices[space];
  if (!spaceConfig) {
    throw new HttpError(400, { space: ["Unknown space"] });
  }

  checkProposalOptions(data);

  if (spaceConfig.accessibility === Accessibility.SOCIETY) {
    ctx.body = await proposalService.createSocietyProposal({
      space,
      networksConfig,
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
      banner,
      data,
      address,
      signature,
    });
    return;
  }

  ctx.body = await proposalService.createProposal({
    space,
    networksConfig,
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
    banner,
    data,
    address,
    signature,
  });
}

module.exports = {
  createProposal,
};
