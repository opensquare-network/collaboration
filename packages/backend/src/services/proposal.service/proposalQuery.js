const { getProposalCollection } = require("../../mongo");
const { getProposalStatus } = require("./common");

async function queryProposals(q, sort = {}, page, pageSize) {
  const proposalCol = await getProposalCollection();
  const total = await proposalCol.countDocuments(q);

  if (page === "last") {
    const totalPages = Math.ceil(total / pageSize);
    page = Math.max(totalPages, 1);
  }

  const proposals = await proposalCol
    .aggregate([
      { $match: q },
      {
        $addFields: {
          terminatedOrEndedAt: {
            $ifNull: ["$terminated.terminatedAt", "$endDate"],
          },
        },
      },
      { $sort: sort },
      { $skip: (page - 1) * pageSize },
      { $limit: pageSize },
    ])
    .toArray();

  return {
    items: (proposals || []).map((proposal) => {
      const status = getProposalStatus(proposal);
      return {
        ...proposal,
        status,
      };
    }),
    total,
    page,
    pageSize,
  };
}

module.exports = {
  queryProposals,
};
