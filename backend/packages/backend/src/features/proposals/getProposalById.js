const proposalService = require("../../services/proposal.service");

async function getProposalById(ctx) {
  const { proposalId } = ctx.params;

  ctx.body = await proposalService.getProposalById(proposalId);
}

module.exports = {
  getProposalById,
};
