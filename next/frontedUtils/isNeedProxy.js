import { isNeedChainAccess } from "./isNeedSnapshot";

export function isSpaceNeedProxy(space) {
  return isNeedChainAccess(space.accessibility, space.weightStrategy);
}

export function isProposalNeedProxy(proposal) {
  return isNeedChainAccess(
    proposal.networksConfig.accessibility,
    proposal.networksConfig.strategies,
  );
}
