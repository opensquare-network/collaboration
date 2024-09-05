const { strategies } = require("../consts/voting");

function hasBalanceStrategy(proposal) {
  return [
    strategies.balanceOf,
    strategies.quorumBalanceOf,
    strategies.quadraticBalanceOf,
    strategies.quorumQuadraticBalanceOf,
    strategies.biasedVoting,
  ].some((strategy) => proposal.weightStrategy.includes(strategy));
}

function hasSocietyStrategy(proposal) {
  return proposal.weightStrategy.includes(strategies.society);
}

function hasOnePersonOneVoteStrategy(proposal) {
  return proposal.weightStrategy.includes(strategies.onePersonOneVote);
}

module.exports = {
  hasBalanceStrategy,
  hasSocietyStrategy,
  hasOnePersonOneVoteStrategy,
};
