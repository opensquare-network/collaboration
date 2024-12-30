const { HttpError } = require("../../exc");
const { getVoteCollection } = require("../../mongo");

async function getUserVotesOfProposals(ctx) {
  const { network, address, proposal_cid: proposalCid } = ctx.query;

  if (!proposalCid) {
    throw new HttpError(400, "Proposal cid is required");
  }

  if (!network) {
    throw new HttpError(400, "Network is required");
  }

  if (!address) {
    throw new HttpError(400, "Address is required");
  }

  const proposalCids = proposalCid.split(",");

  const q = {
    "data.proposalCid": { $in: proposalCids },
    voter: address,
    voterNetwork: network,
  };

  const voteCol = await getVoteCollection();
  const votes = await voteCol.find(q).toArray();

  ctx.body = votes;
}

module.exports = {
  getUserVotesOfProposals,
};
