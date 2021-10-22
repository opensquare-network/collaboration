const { WeightStrategy, Networks } = require("../constants");
const BigNumber = require("bignumber.js");
const { getApi, getSystemBalance } = require("../utils/polkadotApi");
const {
  getEnvWeightStrategies,
  getEnvProposeThreshold,
  getEnvNodeEndpoint,
} = require("../env");

const weightStrategy = (getEnvWeightStrategies("kusama") || WeightStrategy.BalanceOf).split(",");
const proposeThreshold = getEnvProposeThreshold("kusama") || "1000000000000";

const nodeSetting = {
  nodeUrl: getEnvNodeEndpoint("kusama") || "wss://pub.elara.patract.io/kusama",
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
  proposeThreshold,
  weightStrategy,
};
