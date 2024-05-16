import { encodeAddress } from "@polkadot/util-crypto";
import { ethers } from "ethers";

function normalizeAddress(address) {
  try {
    return ethers.utils.getAddress(address);
  } catch (e) {
    // ignore
  }

  try {
    return encodeAddress(address, 42);
  } catch (e) {
    // ignore
  }

  return address;
}

export function isSameAddress(addr1, addr2) {
  if (!addr1 || !addr2) {
    return false;
  }

  return normalizeAddress(addr1) === normalizeAddress(addr2);
}
