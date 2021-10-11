const { WeightStrategy } = require("../constants");
const BigNumber = require("bignumber.js");
const { getApi, getSystemBalance } = require("../utils/polkadotApi");

const nodeSetting = {
  nodeUrl: process.env.KUSAMA_NODE_ENDPOINT || "wss://pub.elara.patract.io/kusama",
};

function _getApi() {
  return getApi(nodeSetting);
}

async function balanceOf(api, blockHash, address) {
  const balance = await getSystemBalance(api, blockHash, address);
  const result = new BigNumber(balance?.free || 0).plus(balance?.reserved || 0).toString();
  return result;
}

module.exports = {
  nodeSetting,
  getApi: _getApi,
  balanceOf,
  symbol: "KSM",
  network: "kusama",
  ss58Format: 2,
  decimals: 12,
  proposeThreshold: "10000000000",
  weightStrategy: WeightStrategy.BalanceOf,
};
