const proposalService = require("../../services/proposal.service");
const { extractPage } = require("../../utils");

async function getVotes(ctx) {
  const { page, pageSize } = extractPage(ctx);
  if (pageSize === 0 || page < 1) {
    ctx.status = 400;
    return;
  }

  const { proposalCid } = ctx.params;
  ctx.body = await proposalService.getVotes(proposalCid, page, pageSize);
}

module.exports = {
  getVotes,
};
