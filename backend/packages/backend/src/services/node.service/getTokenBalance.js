const BigNumber = require("bignumber.js");
const { HttpError } = require("../../exc");
const { NODE_API_ENDPOINT } = require("../../env");
const { isTestAccount } = require("../../utils");
const { fetchApi } = require("../../utils/fech.api");

async function getTokenBalance(network, assetIdOrSymbol, blockHeight, address) {
  if (isTestAccount(address)) {
    return process.env.TEST_ACCOUNT_BALANCE;
  }

  let url = `${NODE_API_ENDPOINT}/${network}/token/${assetIdOrSymbol}/account/${address}/${blockHeight}`;
  try {
    const { free, reserved } = await fetchApi(url);
    return new BigNumber(free || 0).plus(reserved || 0).toString();
  } catch (err) {
    throw new HttpError(500, "Failed to get account token balance");
  }
}

module.exports = {
  getTokenBalance,
};
