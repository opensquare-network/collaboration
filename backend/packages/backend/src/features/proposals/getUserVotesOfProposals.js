const { HttpError } = require("../../exc");
const { getVoteCollection, getProposalCollection } = require("../../mongo");
const { normalizeAddress } = require("../../utils/address");
const { calcWeights } = require("../../services/proposal.service/common");

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

  const proposalCol = await getProposalCollection();
  const proposals = await proposalCol
    .find({ cid: { $in: proposalCids } })
    .toArray();
  const nonAnonymousProposals = new Set(
    proposals.filter((p) => !p.anonymous).map((p) => p.cid),
  );

  const q = {
    "data.proposalCid": { $in: nonAnonymousProposals },
    voter: { $in: [address, normalizedAddress] },
    voterNetwork: network,
  };

  const voteCol = await getVoteCollection();
  const votes = await voteCol.find(q).toArray();

  ctx.body = votes.map((vote) => calcWeights(vote));
}

module.exports = {
  getUserVotesOfProposals,
};
