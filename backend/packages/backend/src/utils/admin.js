const { encodeAddress } = require("@polkadot/util-crypto");
const { ethers } = require("ethers");

const adminAccounts = (process.env.ADMINS || "")
  .split("|")
  .filter((acc) => acc)
  .map((addr) => {
    if (ethers.utils.isAddress(addr)) {
      return addr.toLowerCase();
    }
    return encodeAddress(addr, 42).toLowerCase();
  });

function isAdmin(address) {
  let target = address;
  if (!ethers.utils.isAddress(address)) {
    target = encodeAddress(address, 42);
  }

  return adminAccounts.includes((target || "").toLowerCase());
}

module.exports = {
  isAdmin,
};
