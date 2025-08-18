const { HttpError } = require("../../exc");
const { getVoteCollection, getProposalCollection } = require("../../mongo");
const { normalizeAddress } = require("../../utils/address");
const { calcWeights } = require("../../services/proposal.service/common");
const { getAnonymousVote } = require("../../utils/anonymous");

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
  const anonymousProposals = new Set(
    proposals.filter((p) => p.anonymous).map((p) => p.cid),
  );

  const q = {
    "data.proposalCid": { $in: proposalCids },
    voter: { $in: [address, normalizedAddress] },
    voterNetwork: network,
  };

  const voteCol = await getVoteCollection();
  const votes = await voteCol.find(q).toArray();

  ctx.body = votes.map((vote) => {
    const v = calcWeights(vote);
    if (anonymousProposals.has(vote.data.proposalCid)) {
      return getAnonymousVote(v);
    }
    return v;
  });
}

module.exports = {
  getUserVotesOfProposals,
};
