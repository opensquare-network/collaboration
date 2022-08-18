const { getVoteCollection } = require("../../mongo");
const { calcWeights, getProposalSpaceByCid } = require("./common");

async function getAddressVote(proposalCid, address, network) {
  const q = {
    "data.proposalCid": proposalCid,
    voter: address,
  };

  if (network) {
    q["voterNetwork"] = network;
  }

  const spaceService = await getProposalSpaceByCid(proposalCid);

  const voteCol = await getVoteCollection();
  const vote = await voteCol.findOne(q);
  return vote
    ? calcWeights(vote, spaceService.decimals, spaceService.voteThreshold)
    : vote;
}

module.exports = {
  getAddressVote,
};
