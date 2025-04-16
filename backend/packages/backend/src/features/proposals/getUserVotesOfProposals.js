const { HttpError } = require("../../exc");
const { getVoteCollection } = require("../../mongo");
const { normalizeAddress } = require("../../utils/address");

async function getUserVotesOfProposals(ctx) {
  const { network, address, proposal_cid: proposalCid } = ctx.query;

  if (!proposalCid) {
    throw new HttpError(400, "Query parameter proposal cid is required");
  }

  if (!network) {
    throw new HttpError(400, "Query parameter network is required");
  }

  if (!address) {
    throw new HttpError(400, "Query parameter address is required");
  }

  const proposalCids = proposalCid.split(",");
  const normalizedAddress = normalizeAddress(address);

  const q = {
    "data.proposalCid": { $in: proposalCids },
    voter: { $in: [address, normalizedAddress] },
    voterNetwork: network,
  };

  const voteCol = await getVoteCollection();
  const votes = await voteCol.find(q).toArray();

  ctx.body = votes;
}

module.exports = {
  getUserVotesOfProposals,
};
