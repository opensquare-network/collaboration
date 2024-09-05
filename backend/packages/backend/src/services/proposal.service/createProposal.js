const BigNumber = require("bignumber.js");
const { safeHtml } = require("../../utils/post");
const { NotificationType } = require("../../constants");
const { nextPostUid } = require("../status.service");
const { getProposalCollection } = require("../../mongo");
const { HttpError } = require("../../exc");
const { ContentType } = require("../../constants");
const { getLatestHeight } = require("../chain.service");
const { spaces: spaceServices } = require("../../spaces");
const { checkDelegation } = require("../../services/node.service");
const { getBalanceFromNetwork } = require("../../services/node.service");
const { pinData, createSpaceNotifications } = require("./common");
const { isAdmin } = require("../../utils/admin");

async function createProposal({
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
}) {
  const spaceService = spaceServices[space];
  if (spaceService.onlyAdminCanCreateProposals && !isAdmin(space, address)) {
    throw new HttpError(401, `Only the space admins can create proposals`);
  }

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
  });

  if (spaceService.proposeThreshold) {
    const bnCreatorBalance = new BigNumber(creatorBalance?.balanceOf);
    if (bnCreatorBalance.lt(spaceService.proposeThreshold)) {
      throw new HttpError(403, "Balance is not enough to create the proposal");
    }
  }

  const { cid, pinHash } = await pinData({ data, address, signature });

  const postUid = await nextPostUid();

  const uniqueChoices = Array.from(new Set(choices));
  const now = new Date();

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
    // Version 2: support multi-network space
    // Version 3: support multi-assets network
    version: "3",
  });

  if (!result.insertedId) {
    throw new HttpError(500, "Failed to create post");
  }

  createSpaceNotifications(space, NotificationType.NewProposal, {
    proposalCid: cid,
    space,
    title,
  });

  return {
    cid,
    postUid,
  };
}

module.exports = {
  createProposal,
};
