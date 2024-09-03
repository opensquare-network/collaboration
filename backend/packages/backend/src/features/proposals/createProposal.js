const { HttpError } = require("../../exc");
const proposalService = require("../../services/proposal.service");
const { ChoiceType } = require("../../constants");
const isEmpty = require("lodash.isempty");
const { spaces: spaceServices } = require("../../spaces");
const { Accessibility } = require("../../consts/space");
const { checkProposalContent } = require("./checkProposalContent");
const isEqual = require("lodash.isequal");
const pick = require("lodash.pick");
const { getLatestHeight } = require("../../services/chain.service");

function checkProposalChoices(data) {
  const { space, choiceType, choices } = data;

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

  const uniqueChoices = Array.from(new Set(choices));
  if (uniqueChoices.length < 2) {
    throw new HttpError(400, {
      choices: ["There must be at least 2 different choices"],
    });
  }

  const spaceService = spaceServices[space];
  const maxOptionsCount = spaceService.maxOptionsCount || 10;
  if (choices.length > spaceService.maxOptionsCount) {
    throw new HttpError(
      400,
      `Too many options, support up to ${maxOptionsCount} options`,
    );
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

  if (endDate <= startDate) {
    throw new HttpError(400, "Start date should not be later than end date");
  }

  const now = new Date();

  if (endDate < now.getTime()) {
    throw new HttpError(
      400,
      "End date should not be earlier than current time",
    );
  }
}

async function checkSnapshotHeights(data) {
  const { space, snapshotHeights } = data;

  if (!snapshotHeights) {
    throw new HttpError(400, { content: ["Snapshot height is missing"] });
  }

  const spaceService = spaceServices[space];

  // Check if the snapshot heights is matching the space configuration
  const snapshotNetworks = Object.keys(snapshotHeights || {});
  if (
    snapshotNetworks.length === 0 ||
    snapshotNetworks.length !== spaceService.networks.length
  ) {
    throw new HttpError(400, {
      snapshotHeights: [
        "The snapshot heights must match the space configuration",
      ],
    });
  }

  for (const spaceNetwork of spaceService.networks) {
    if (snapshotNetworks.includes(spaceNetwork.network)) {
      continue;
    }

    throw new HttpError(400, {
      snapshotHeights: [`Missing snapshot height of ${spaceNetwork.network}`],
    });
  }

  await Promise.all(
    Object.keys(snapshotHeights).map(async (chain) => {
      const lastHeight = await getLatestHeight(chain);
      if (lastHeight && snapshotHeights[chain] > lastHeight) {
        throw new HttpError(
          400,
          `Snapshot height should not be higher than the current finalized height: ${chain}`,
        );
      }
    }),
  );
}

function checkNetworkConfig(data) {
  const { space, networksConfig } = data;

  if (isEmpty(networksConfig)) {
    throw new HttpError(400, {
      networksConfig: ["Networks config is missing"],
    });
  }

  const spaceService = spaceServices[space];
  if (
    !isEqual(networksConfig, {
      ...pick(spaceService, ["symbol", "decimals", "networks"]),
      strategies: spaceService.weightStrategy,
      ...pick(spaceService, ["quorum", "version"]),
    })
  ) {
    throw new HttpError(400, {
      networksConfig: [
        "The proposal networks config is not matching the space config",
      ],
    });
  }
}

async function checkProposalSpace(data) {
  const { space } = data;

  if (!space) {
    throw new HttpError(400, { space: ["Space is missing"] });
  }

  const spaceConfig = spaceServices[space];
  if (!spaceConfig) {
    throw new HttpError(400, { space: ["Unknown space"] });
  }
}

async function checkProposalOptions(data) {
  const { proposerNetwork } = data;

  if (!proposerNetwork) {
    throw new HttpError(400, {
      proposerNetwork: ["Proposer network is missing"],
    });
  }

  checkProposalSpace(data);

  checkNetworkConfig(data);

  await checkSnapshotHeights(data);

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

  await checkProposalOptions(data);

  const spaceConfig = spaceServices[space];

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
