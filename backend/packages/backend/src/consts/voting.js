const strategies = Object.freeze({
  balanceOf: "balance-of",
  quorumBalanceOf: "quorum-balance-of",
  quadraticBalanceOf: "quadratic-balance-of",
  quorumQuadraticBalanceOf: "quorum-quadratic-balance-of",
  biasedVoting: "biased-voting",
  onePersonOneVote: "one-person-one-vote",
});

module.exports = {
  strategies,
};
