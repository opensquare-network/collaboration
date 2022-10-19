import { evmChains, getChainConfigs } from "../consts/chains";
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

  const configs = getChainConfigs(chain);
  try {
    return encodeAddress(origin, configs.ss58Format);
  } catch (e) {
    console.error(
      `Can not encode ${origin} with ss58Format ${configs.ss58Format}`
    );
    return origin;
  }
}
