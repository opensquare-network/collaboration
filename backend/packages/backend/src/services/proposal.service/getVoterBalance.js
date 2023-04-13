const { getProposalCollection } = require("../../mongo");
const { HttpError } = require("../../exc");
const { getLatestHeight } = require("../chain.service");
const { getBalanceFromNetwork } = require("../../services/node.service");

async function getVoterBalance(proposalCid, network, address, snapshot) {
  const proposalCol = await getProposalCollection();
  const proposal = await proposalCol.findOne({ cid: proposalCid });
  if (!proposal) {
    throw new HttpError(404, "Proposal does not exists");
  }
  const networksConfig = proposal.networksConfig;

  const blockHeight = snapshot
    ? parseInt(snapshot)
    : await getLatestHeight(network);

  const totalBalance = await getBalanceFromNetwork({
    networksConfig,
    networkName: network,
    address,
    blockHeight,
  });

  return totalBalance;
}

module.exports = {
  getVoterBalance,
};
