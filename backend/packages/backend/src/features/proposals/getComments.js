const proposalService = require("../../services/proposal.service");
const { extractPage } = require("../../utils");

async function getComments(ctx) {
  const { page, pageSize } = extractPage(ctx);
  if (pageSize === 0 || page < 1) {
    ctx.status = 400;
    return;
  }

  const { proposalCid } = ctx.params;
  ctx.body = await proposalService.getComments(proposalCid, page, pageSize);
}

module.exports = {
  getComments,
};
