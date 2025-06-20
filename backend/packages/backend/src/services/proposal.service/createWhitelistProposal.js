const { HttpError } = require("../../exc");
const { spaces: spaceServices } = require("../../spaces");
const { isSameAddress } = require("../../utils/address");
const { getLatestHeight } = require("../chain.service");
const { checkProxy } = require("../node.service");
const { saveProposal } = require("./createProposal");

async function checkWhitelistMember(networksConfig, address) {
  const members = networksConfig.members || networksConfig.whitelist || [];
  if (members.findIndex((item) => isSameAddress(item, address)) === -1) {
    throw new HttpError(400, "Only members can create a proposal");
  }
}

async function createWhitelistProposal({
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

  await checkWhitelistMember(networksConfig, proposer);

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
  createWhitelistProposal,
};
