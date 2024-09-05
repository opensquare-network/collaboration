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
