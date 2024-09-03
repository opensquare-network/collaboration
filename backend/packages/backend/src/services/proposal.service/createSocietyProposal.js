const { safeHtml } = require("../../utils/post");
const { NotificationType } = require("../../constants");
const { nextPostUid } = require("../status.service");
const { getProposalCollection } = require("../../mongo");
const { HttpError } = require("../../exc");
const { ContentType } = require("../../constants");
const { spaces: spaceServices } = require("../../spaces");
const { pinData, createSpaceNotifications } = require("./common");

async function createSocietyProposal({
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
  const weightStrategy = spaceService.weightStrategy;

  const proposer = realProposer || address;

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
  createSocietyProposal,
};
