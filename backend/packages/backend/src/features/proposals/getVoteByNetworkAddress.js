const proposalService = require("../../services/proposal.service");

async function getVoteByNetworkAddress(ctx) {
  const { proposalCid, network, address } = ctx.params;
  ctx.body = await proposalService.getAddressVote(
    proposalCid,
    address,
    network,
  );
}

module.exports = {
  getVoteByNetworkAddress,
};
