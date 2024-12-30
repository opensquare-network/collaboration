const { getVoteCollection } = require("../../mongo");

async function getUserVotesOfProposals(ctx) {
  const { network, address, proposal_cid } = ctx.query;

  const proposalCids = proposal_cid.split(",");

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
