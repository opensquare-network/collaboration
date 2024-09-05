export function hasBalanceStrategy(strategies) {
  return (
    strategies &&
    strategies.some((strategy) =>
      [
        "balance-of",
        "quorum-balance-of",
        "quadratic-balance-of",
        "quorum-quadratic-balance-of",
        "biased-voting",
      ].includes(strategy),
    )
  );
}

export function hasSocietyVoteStrategyOnly(strategies) {
  return strategies && strategies.length === 1 && strategies[0] === "society";
}

export function hasOnePersonOneVoteStrategyOnly(strategies) {
  return (
    strategies &&
    strategies.length === 1 &&
    strategies[0] === "one-person-one-vote"
  );
}
