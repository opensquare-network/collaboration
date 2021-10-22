const BigNumber = require("bignumber.js");
const { typesBundleForPolkadot } = require("@acala-network/type-definitions");
const { getApi, getSystemBalance } = require("../utils/polkadotApi");
const { WeightStrategy, Networks } = require("../constants");
const {
  getEnvWeightStrategies,
  getEnvProposeThreshold,
  getEnvNodeEndpoint,
} = require("../env");

const weightStrategy = (getEnvWeightStrategies("karura") || WeightStrategy.BalanceOf).split(",");
const proposeThreshold = getEnvProposeThreshold("karura") || "1000000000000";

const nodeSetting = {
  nodeUrl: getEnvNodeEndpoint("karura") || "wss://pub.elara.patract.io/karura",
  typesBundle: typesBundleForPolkadot,
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
  ...Networks.Karura,
  relay: Networks.Kusama,
  nodeSetting,
  getApi: _getApi,
  balanceOf,
  proposeThreshold,
  weightStrategy,
};
