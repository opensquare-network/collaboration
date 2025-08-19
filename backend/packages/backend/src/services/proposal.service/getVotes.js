const { getProposalCollection, getVoteCollection } = require("../../mongo");
const { calcWeights, getProposalSpace } = require("./common");
const { getAnonymousVote } = require("../../utils/anonymous");

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
  const votesWithWeights = votes.map((v) =>
    calcWeights(v, spaceService.decimals),
  );

  if (proposal.anonymous) {
    const anonymousVotes = votesWithWeights.map((vote) =>
      getAnonymousVote(vote),
    );
    return {
      items: anonymousVotes,
      total,
      page,
      pageSize,
    };
  }

  return {
    items: votesWithWeights,
    total,
    page,
    pageSize,
  };
}

module.exports = {
  getVotes,
};
