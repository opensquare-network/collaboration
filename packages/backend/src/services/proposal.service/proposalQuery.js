const { getProposalCollection } = require("../../mongo");
const { addProposalStatus } = require("./common");

async function queryProposals(q, sort = {}, page, pageSize) {
  const proposalCol = await getProposalCollection();
  const total = await proposalCol.countDocuments(q);

  if (page === "last") {
    const totalPages = Math.ceil(total / pageSize);
    page = Math.max(totalPages, 1);
  }

  const proposals = await proposalCol
    .find(q)
    .sort(sort)
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .toArray();

  return {
    items: (proposals || []).map(addProposalStatus(new Date())),
    total,
    page,
    pageSize,
  };
}

module.exports = {
  queryProposals,
};
