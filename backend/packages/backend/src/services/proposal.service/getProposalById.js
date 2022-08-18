const { ObjectId } = require("mongodb");
const BigNumber = require("bignumber.js");
const { getProposalStatus } = require("./common");
const {
  getProposalCollection,
  getVoteCollection,
  getAppendantCollection,
} = require("../../mongo");
const { HttpError } = require("../../exc");
const { spaces: spaceServices } = require("../../spaces");
const { calcWeights } = require("./common");

async function getProposalById(proposalId) {
  const q = {};
  if (ObjectId.isValid(proposalId)) {
    q._id = ObjectId(proposalId);
  } else if (proposalId.match(/^[0-9]+$/)) {
    q.postUid = proposalId;
  } else {
    q.cid = proposalId;
  }

  const proposalCol = await getProposalCollection();
  const proposal = await proposalCol.findOne(q);

  if (!proposal) {
    throw new HttpError(404, "Post not found");
  }

  const spaceService = spaceServices[proposal.space];
  if (!spaceService) {
    throw new HttpError(500, "Unkown space");
  }
  const voteThreshold = spaceService.voteThreshold;
  const decimals = spaceService.decimals;

  const appendantCol = await getAppendantCollection();
  const appendants = await appendantCol
    .find({ proposal: proposal._id })
    .sort({ createdAt: 1 })
    .toArray();
  proposal.appendants = appendants;

  const voteCol = await getVoteCollection();
  const votesCount = await voteCol.countDocuments({ proposal: proposal._id });

  const votes = await voteCol.find({ proposal: proposal._id }).toArray();
  const calculatedVotes = votes.map((v) =>
    calcWeights(v, decimals, voteThreshold)
  );
  const votedWeights = {};
  for (const vote of calculatedVotes) {
    votedWeights.balanceOf = new BigNumber(votedWeights.balanceOf || 0)
      .plus(vote.weights.balanceOf)
      .toString();
    votedWeights.quadraticBalanceOf = new BigNumber(
      votedWeights.quadraticBalanceOf || 0
    )
      .plus(vote.weights.quadraticBalanceOf)
      .toString();
  }
  proposal.votesCount = votesCount;
  proposal.votedWeights = votedWeights;

  const status = getProposalStatus(proposal);
  return {
    ...proposal,
    status,
  };
}

module.exports = {
  getProposalById,
};
