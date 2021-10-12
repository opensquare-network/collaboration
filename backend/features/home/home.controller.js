const proposalService = require("../../services/proposal.service");

async function getHottestProposals(ctx) {
  ctx.body = await proposalService.getHottestProposals();
}

module.exports = {
  getHottestProposals,
}
