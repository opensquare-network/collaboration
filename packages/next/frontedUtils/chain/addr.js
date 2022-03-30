import { chainSs58Format, evmChains } from "../consts/chains";
import { encodeAddress } from "@polkadot/util-crypto";

/**
 * Make sure the origin and chain is correct to call this function
 * @param origin
 * @param chain
 */
export default function encodeAddressByChain(origin, chain) {
  if (evmChains.includes(chain)) {
    return origin;
  }

  const ss58Format = chainSs58Format[chain];
  if (typeof ss58Format === "undefined") {
    throw new Error(`Can not find ss58Format for ${chain}`);
  }

  return encodeAddress(origin, ss58Format);
}
