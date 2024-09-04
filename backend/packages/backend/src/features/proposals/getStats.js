const proposalService = require("../../services/proposal.service");

async function getStats(ctx) {
  const { proposalCid } = ctx.params;
  ctx.body = await proposalService.getStats(proposalCid);
}

module.exports = {
  getStats,
};
