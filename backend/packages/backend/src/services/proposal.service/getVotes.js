const { getProposalCollection, getVoteCollection } = require("../../mongo");
const { calcWeights, getProposalSpace } = require("./common");

async function getVotes(proposalCid, page, pageSize) {
  const proposalCol = await getProposalCollection();
  const proposal = await proposalCol.findOne({ cid: proposalCid });
  const q = { proposal: proposal?._id };

  const voteCol = await getVoteCollection();
  const total = await voteCol.count(q);

  if (page === "last") {
    const totalPages = Math.ceil(total / pageSize);
    page = Math.max(totalPages, 1);
  }

  const votes = await voteCol
    .find(q)
    .sort({ createdAt: 1 })
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .toArray();

  const spaceService = await getProposalSpace(proposal);

  return {
    items: votes.map((v) => calcWeights(v, spaceService.decimals)),
    total,
    page,
    pageSize,
  };
}

module.exports = {
  getVotes,
};
