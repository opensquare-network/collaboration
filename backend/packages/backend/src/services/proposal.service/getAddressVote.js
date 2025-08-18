const { getVoteCollection } = require("../../mongo");
const { calcWeights, getProposalSpaceByCid } = require("./common");
const { normalizeAddress } = require("../../utils/address");
const { HttpError } = require("../../exc");

async function getAddressVote(proposalCid, address, network) {
  const normalizedAddress = normalizeAddress(address);
  const q = {
    "data.proposalCid": proposalCid,
    voter: { $in: [address, normalizedAddress] },
  };

  if (network) {
    q["voterNetwork"] = network;
  }

  const spaceService = await getProposalSpaceByCid(proposalCid);
  if (spaceService.allowAnonymousProposal) {
    throw new HttpError(400, "Get anonymous voting is not allowed");
  }

  const voteCol = await getVoteCollection();
  const vote = await voteCol.findOne(q);
  return vote ? calcWeights(vote, spaceService.decimals) : vote;
}

module.exports = {
  getAddressVote,
};
