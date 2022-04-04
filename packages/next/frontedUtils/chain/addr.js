import { chainSs58Format, evmChains } from "../consts/chains";
import { encodeAddress } from "@polkadot/util-crypto";
import { ethers } from "ethers";

/**
 * Make sure the origin and chain is correct to call this function
 * @param origin
 * @param chain
 */
export default function encodeAddressByChain(origin, chain) {
  if (evmChains.includes(chain) || ethers.utils.isAddress(origin)) {
    return origin;
  }

  const ss58Format = chainSs58Format[chain];
  if (typeof ss58Format === "undefined") {
    throw new Error(`Can not find ss58Format for ${chain}`);
  }

  try {
    return encodeAddress(origin, ss58Format);
  } catch (e) {
    console.error(`Can not encode ${origin} with ss58Format ${ss58Format}`);
    return origin;
  }
}
