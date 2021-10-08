const proposalService = require("../../services/proposal.service");

async function getHotestProposals(ctx) {
  ctx.body = await proposalService.getHotestProposals();
}

module.exports = {
  getHotestProposals,
}
