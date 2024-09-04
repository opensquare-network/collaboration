const proposalService = require("../../services/proposal.service");

async function getAddressVote(ctx) {
  const { proposalCid, address } = ctx.params;

  ctx.body = await proposalService.getAddressVote(proposalCid, address);
}

module.exports = {
  getAddressVote,
};
