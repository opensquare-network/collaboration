const BigNumber = require("bignumber.js");
const { khala } = require("@phala/typedefs");
const { getApi, getSystemBalance } = require("../utils/polkadotApi");
const { WeightStrategy, Networks } = require("../constants");
const {
  getEnvWeightStrategies,
  getEnvProposeThreshold,
  getEnvNodeEndpoint,
} = require("../env");

const weightStrategy = (getEnvWeightStrategies("khala") || WeightStrategy.BalanceOf).split(",");
const proposeThreshold = getEnvProposeThreshold("khala") || "1000000000000";

const nodeSetting = {
  nodeUrl: getEnvNodeEndpoint("khala") || "wss://khala.api.onfinality.io/public-ws",
  types: khala,
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
  ...Networks.Khala,
  relay: Networks.Kusama,
  nodeSetting,
  getApi: _getApi,
  balanceOf,
  proposeThreshold,
  weightStrategy,
};
