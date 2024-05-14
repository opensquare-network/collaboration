const { spaces: spaceServices } = require("../../spaces");
const { getProposalStatus } = require("../../services/proposal.service/common");
const { getProposalCollection } = require("../../mongo");

async function getHottestProposals(ctx) {
  const now = Date.now();
  const q = {
    startDate: { $lte: now },
    endDate: { $gt: now },
    terminated: null,
  };

  const proposalCol = await getProposalCollection();
  const proposals = await proposalCol
    .find(q, { sort: { lastActivityAt: -1 } })
    .limit(10)
    .toArray();

  ctx.body = (proposals || []).map((proposal) => {
    const status = getProposalStatus(proposal);
    const spaceInfo = spaceServices[proposal.space];
    return {
      ...proposal,
      status,
      spaceInfo,
    };
  });
}

module.exports = {
  getHottestProposals,
};
