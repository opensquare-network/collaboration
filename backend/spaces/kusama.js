const { WeightStrategy, Networks } = require("../constants");
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
  ...Networks.Kusama,
  nodeSetting,
  getApi: _getApi,
  balanceOf,
  proposeThreshold: process.env.SPACE_PROPOSE_THRESHOLD_KUSAMA || "10000000000",
  weightStrategy: process.env.SPACE_WEIGHT_STRATEGY_KUSAMA || WeightStrategy.BalanceOf,
};
