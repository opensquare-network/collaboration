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
    calcWeights(v, spaceService.decimals, spaceService.voteThreshold),
  );
  const stats = Object.fromEntries(
    proposal.choices.map((choice) => [
      choice,
      {
        choice,
        balanceOf: "0",
        quadraticBalanceOf: "0",
        votesCount: 0,
      },
    ]),
  );

  const total = {
    balanceOf: new BigNumber(0),
    quadraticBalanceOf: new BigNumber(0),
    voteCount: 0,
  };

  for (const vote of calculatedVotes) {
    total.balanceOf = total.balanceOf.plus(vote.weights.balanceOf);
    total.quadraticBalanceOf = total.quadraticBalanceOf.plus(
      vote.weights.quadraticBalanceOf,
    );
    total.voteCount += 1;

    for (const choice of vote.choices) {
      const weights = (stats[choice] = stats[choice] || { choice });
      weights.balanceOf = new BigNumber(weights.balanceOf || 0)
        .plus(vote.weights.balanceOf)
        .toString();
      weights.quadraticBalanceOf = new BigNumber(
        weights.quadraticBalanceOf || 0,
      )
        .plus(vote.weights.quadraticBalanceOf)
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

  return {
    choices: Object.values(stats),
    total,
  };
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
