import { networks } from "frontedUtils/consts/chains/networks";

export function normalizeChainName(chainName) {
  if (chainName === networks.bifrost) {
    return "bifrost-kusama";
  }
  return chainName;
}
