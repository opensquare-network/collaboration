const { HttpError } = require("../../exc");
const { spaces: spaceServices } = require("../../spaces");
const { getLatestHeight } = require("../chain.service");
const { checkProxy } = require("../node.service");
const { getSocietyMember } = require("../node.service/getSocietyMember");
const { saveProposal } = require("./createProposal");

async function checkSocietyMember({ proposerNetwork, proposer }) {
  const societyMember = await getSocietyMember(proposerNetwork, proposer);
  if (!societyMember.data) {
    throw new HttpError(400, "You are not the society member");
  }
}

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

  if (realProposer && realProposer !== address) {
    const lastHeight = await getLatestHeight(proposerNetwork);
    await checkProxy(proposerNetwork, address, realProposer, lastHeight);
  }

  const proposer = realProposer || address;

  await checkSocietyMember({
    proposerNetwork,
    proposer,
  });

  return await saveProposal({
    data,
    address,
    signature,
    choices,
    space,
    networksConfig,
    title,
    contentType,
    content,
    choiceType,
    startDate,
    endDate,
    snapshotHeights,
    weightStrategy,
    proposer,
    proposerNetwork,
    banner,
  });
}

module.exports = {
  createSocietyProposal,
};
