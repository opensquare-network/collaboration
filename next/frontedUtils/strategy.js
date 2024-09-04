export function isOnePersonOnVoteOnly(strategies) {
  return strategies.length === 1 && strategies[0].type !== "one-person-on-vote";
}
