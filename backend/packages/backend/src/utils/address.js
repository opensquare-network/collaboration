const { encodeAddress } = require("@polkadot/util-crypto");
const { ethers } = require("ethers");

function normalizeAddress(address) {
  if (!address) {
    return address;
  }

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

function isSameAddress(addr1, addr2) {
  if (!addr1 || !addr2) {
    return false;
  }

  return normalizeAddress(addr1) === normalizeAddress(addr2);
}

module.exports = {
  normalizeAddress,
  isSameAddress,
};
