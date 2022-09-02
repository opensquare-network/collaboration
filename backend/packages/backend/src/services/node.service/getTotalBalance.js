const BigNumber = require("bignumber.js");
const { HttpError } = require("../../exc");
const { NODE_API_ENDPOINT } = require("../../env");
const { isTestAccount } = require("../../utils");
const { fetchApi } = require("../../utils/fech.api");

async function getSystemBalance(network, blockHeight, address) {
  if (isTestAccount(address)) {
    return {
      free: process.env.TEST_ACCOUNT_BALANCE || "10000000000000",
      reserved: 0,
    };
  }

  const url = `${NODE_API_ENDPOINT}/${network}/balance/${address}/${blockHeight}`;
  try {
    return await fetchApi(url);
  } catch (err) {
    throw new HttpError(500, "Failed to get account balance");
  }
}

async function getTotalBalance(network, blockHeight, address) {
  const { free, reserved } = await getSystemBalance(
    network,
    blockHeight,
    address
  );
  return new BigNumber(free || 0).plus(reserved || 0).toString();
}

module.exports = {
  getTotalBalance,
};
