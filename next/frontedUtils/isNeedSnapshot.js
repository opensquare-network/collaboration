import { hasOnePersonOneVoteStrategyOnly } from "./strategy";

export function isNeedChainAccess(accessibility, strategies) {
  const isWhitelist = accessibility === "whitelist";
  const isOnePersonOneVote = hasOnePersonOneVoteStrategyOnly(strategies);
  const noChainAccess = isWhitelist && isOnePersonOneVote;

  return !noChainAccess;
}

export function isSpaceNeedSnapshot(space) {
  return isNeedChainAccess(space.accessibility, space.weightStrategy);
}

export function isProposalNeedSnapshot(proposal) {
  return isNeedChainAccess(
    proposal.networksConfig.accessibility,
    proposal.networksConfig.strategies,
  );
}
