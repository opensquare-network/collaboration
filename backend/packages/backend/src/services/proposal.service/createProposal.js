const BigNumber = require("bignumber.js");
const { safeHtml } = require("../../utils/post");
const { PostTitleLengthLimitation } = require("../../constants");
const { nextPostUid } = require("../status.service");
const { getProposalCollection } = require("../../mongo");
const { HttpError } = require("../../exc");
const { ContentType } = require("../../constants");
const { getLatestHeight } = require("../chain.service");
const { spaces: spaceServices } = require("../../spaces");
const { checkDelegation } = require("../../services/node.service");
const { getBalanceFromNetwork } = require("../../services/node.service");
const { pinData } = require("./common");

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
  banner,
  data,
  address,
  signature
) {
  if (title.length > PostTitleLengthLimitation) {
    throw new HttpError(400, {
      title: ["Title must be no more than %d characters"],
    });
  }

  if (endDate <= startDate) {
    throw new HttpError(400, "Start date should not be larger than end date");
  }

  const now = new Date();

  if (endDate < now.getTime()) {
    throw new HttpError(
      400,
      "End date should not be earlier than current time"
    );
  }

  const uniqueChoices = Array.from(new Set(choices));
  if (uniqueChoices.length < 2) {
    throw new HttpError(400, {
      choices: ["There must be at least 2 different choices"],
    });
  }

  const spaceService = spaceServices[space];
  if (!spaceService) {
    throw new HttpError(500, "Unknown space");
  }

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
          `Snapshot height should not be higher than the current finalized height: ${chain}`
        );
      }
    })
  );

  const networksConfig = {
    symbol: spaceService.symbol,
    decimals: spaceService.decimals,
    networks: spaceService.networks,
  };

  const weightStrategy = spaceService.weightStrategy;

  const lastHeight = await getLatestHeight(proposerNetwork);

  if (realProposer && realProposer !== address) {
    await checkDelegation(proposerNetwork, address, realProposer, lastHeight);
  }

  const proposer = realProposer || address;

  const creatorBalance = await getBalanceFromNetwork({
    networksConfig,
    networkName: proposerNetwork,
    address: proposer,
    blockHeight: lastHeight,
    spaceDecimals: spaceService?.decimals,
  });

  const bnCreatorBalance = new BigNumber(creatorBalance);
  if (bnCreatorBalance.lt(spaceService.proposeThreshold)) {
    throw new HttpError(403, `Balance is not enough to create the proposal`);
  }

  const { cid, pinHash } = await pinData(data, address, signature);

  const postUid = await nextPostUid();

  const proposalCol = await getProposalCollection();
  const result = await proposalCol.insertOne({
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
    banner,
    data,
    address,
    signature,
    lastActivityAt: new Date(),
    createdAt: now,
    updatedAt: now,
    cid,
    pinHash,
    version: "2",
  });

  if (!result.insertedId) {
    throw new HttpError(500, "Failed to create post");
  }

  return {
    cid,
    postUid,
  };
}

module.exports = {
  createProposal,
};