const BigNumber = require("bignumber.js");
const {
  queryProposals,
} = require("../../services/proposal.service/proposalQuery");
const { getVoteCollection } = require("../../mongo");

async function getProposalNativeVotes(proposal, nativeToken) {
  const voteCol = await getVoteCollection();
  const votes = await voteCol.find({ proposal: proposal?._id }).toArray();

  // Find out votes that are using CFG
  const nativeVotes = votes
    .map((vote) =>
      vote.weights.details.find((item) => item.symbol === nativeToken),
    )
    .filter(Boolean);

  const totalNativeVotes = nativeVotes.reduce(
    (acc, vote) =>
      acc.plus(new BigNumber(vote.balance).div(10 ** vote.decimals)),
    new BigNumber(0),
  );

  return {
    cid: proposal.cid,
    totalNativeVotes,
  };
}

async function getAverageTurnout(ctx) {
  const { space } = ctx.params;

  if (space !== "centrifuge") {
    ctx.throw(400, "Space does not support this feature");
    return;
  }

  const nativeToken = "CFG";

  const q = {
    space,
    $or: [
      { endDate: { $lte: Date.now() } }, // Ended
      { terminated: { $ne: null } }, // Not terminated, so it's closed
    ],
  };

  const { items: proposals, total } = await queryProposals(
    q,
    { terminatedOrEndedAt: -1 },
    1,
    10,
  );

  if (total === 0) {
    ctx.body = {
      averageTurnout: "0",
    };
    return;
  }

  const promises = proposals.map(async (proposal) =>
    getProposalNativeVotes(proposal, nativeToken),
  );
  const details = await Promise.all(promises);

  const totalVotes = details.reduce(
    (acc, item) => acc.plus(item.totalNativeVotes),
    new BigNumber(0),
  );
  const averageTurnout = totalVotes.dividedBy(proposals.length).toString();

  ctx.body = {
    averageTurnout,
    details,
  };
}

module.exports = {
  getAverageTurnout,
};
