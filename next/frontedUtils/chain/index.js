import { networks } from "frontedUtils/consts/chains/networks";

export function normalizeChainName(chainName) {
  if (chainName === networks.bifrost) {
    return networks.bifrostKusama;
  }
  return chainName;
}
