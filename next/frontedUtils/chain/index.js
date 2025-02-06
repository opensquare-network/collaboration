import startCase from "lodash.startcase";
import { networks } from "frontedUtils/consts/chains/networks";

export function normalizeChainName(chainName) {
  if (chainName === networks.bifrost) {
    return "bifrost-kusama";
  }
  return chainName;
}

export function getChainDisplayName(chainName) {
  if (chainName === networks.creditcoinEvm) {
    return "Creditcoin";
  }
  return startCase(normalizeChainName(chainName));
}
