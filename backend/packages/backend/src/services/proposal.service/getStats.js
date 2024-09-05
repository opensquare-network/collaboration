const BigNumber = require("bignumber.js");
const { strategies } = require("../../consts/voting");
const { tokenParentChain } = require("../../consts/token");
const { getTotalIssuance } = require("../node.service");
const { getProposalCollection, getVoteCollection } = require("../../mongo");
const { calcPassing } = require("../biased-voting.service");
const { calcWeights, getProposalSpace } = require("./common");

async function getStats(proposalCid) {
  const proposalCol = await getProposalCollection();
  const proposal = await proposalCol.findOne({ cid: proposalCid });
  const q = { proposal: proposal?._id };

  const spaceService = await getProposalSpace(proposal);

  const voteCol = await getVoteCollection();
  const votes = await voteCol.find(q).toArray();
  const calculatedVotes = votes.map((v) =>
    calcWeights(v, spaceService.decimals),
  );

  const stats = Object.fromEntries(
    proposal.choices.map((choice) => [
      choice,
      {
        choice,
        balanceOf: "0",
        quadraticBalanceOf: "0",
        societyVote: "0",
        onePersonOneVote: "0",
        votesCount: 0,
      },
    ]),
  );
  for (const vote of calculatedVotes) {
    for (const choice of vote.choices) {
      const weights = (stats[choice] = stats[choice] || { choice });

      weights.balanceOf = new BigNumber(weights.balanceOf || 0)
        .plus(vote.weights.balanceOf || 0)
        .toString();
      weights.quadraticBalanceOf = new BigNumber(
        weights.quadraticBalanceOf || 0,
      )
        .plus(vote.weights.quadraticBalanceOf || 0)
        .toString();

      weights.societyVote = new BigNumber(weights.societyVote || 0)
        .plus(vote.weights.societyVote || 0)
        .toString();

      weights.onePersonOneVote = new BigNumber(weights.onePersonOneVote || 0)
        .plus(1)
        .toString();

      weights.votesCount = (weights.votesCount || 0) + 1;
    }
  }

  if (
    proposal.choices?.length === 2 &&
    proposal.weightStrategy?.includes(strategies.biasedVoting) &&
    proposal.networksConfig?.symbol !== "VOTE"
  ) {
    const blockHeight =
      proposal.snapshotHeights[tokenParentChain[spaceService.symbol]];
    let totalIssuance = await getTotalIssuance(
      spaceService.symbol,
      blockHeight,
    );
    calcBiasedVotingResult(proposal, stats, totalIssuance);
  }

  return Object.values(stats);
}

function calcBiasedVotingResult(proposal, stats, totalIssuance) {
  const ayeChoice = stats[proposal.choices[0]] || {};
  const nayChoice = stats[proposal.choices[1]] || {};

  const superMajorityApprove = calcPassing(
    ayeChoice.balanceOf || 0,
    nayChoice.balanceOf || 0,
    "SuperMajorityApprove",
    totalIssuance,
  );
  const superMajorityAgainst = calcPassing(
    ayeChoice.balanceOf || 0,
    nayChoice.balanceOf || 0,
    "SuperMajorityAgainst",
    totalIssuance,
  );

  ayeChoice.biasedVoting = {
    superMajorityApprove,
    superMajorityAgainst,
    electorate: new BigNumber(totalIssuance).toString(),
  };
}

module.exports = {
  getStats,
};
