const { addProposalStatus } = require("../../services/proposal.service");
const { getProposalCollection } = require("../../mongo");

async function getHottestProposals(ctx) {
  const now = Date.now();
  const q = {
    startDate: { $lte: now },
    endDate: { $gt: now },
  };

  const proposalCol = await getProposalCollection();
  const proposals = await proposalCol
    .find(q, { sort: { lastActivityAt: -1 } })
    .limit(10)
    .toArray();

  const addStatus = addProposalStatus(now);

  ctx.body = proposals.map(addStatus);
}

module.exports = {
  getHottestProposals,
};
