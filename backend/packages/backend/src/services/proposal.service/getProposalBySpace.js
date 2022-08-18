const { queryProposals } = require("./proposalQuery");

async function getProposalBySpace(space, page, pageSize) {
  const q = { space };
  return queryProposals(q, { lastActivityAt: -1 }, page, pageSize);
}

module.exports = {
  getProposalBySpace,
};
