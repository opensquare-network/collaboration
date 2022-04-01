const proposalService = require("../../services/proposal.service");

async function getHottestProposals(ctx) {
  ctx.body = await proposalService.getHottestProposals(1, 10);
}

module.exports = {
  getHottestProposals,
};
