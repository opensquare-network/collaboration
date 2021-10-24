const { WeightStrategy, Networks } = require("../constants");
const { getApi } = require("../utils/polkadotApi");
const {
  getEnvWeightStrategies,
  getEnvProposeThreshold,
  getEnvNodeEndpoint,
} = require("../env");

const weightStrategy = (getEnvWeightStrategies("polkadot") || WeightStrategy.BalanceOf).split(",");
const proposeThreshold = getEnvProposeThreshold("polkadot") || "1000000000000";

const nodeSetting = {
  nodeUrl: getEnvNodeEndpoint("polkadot") || "wss://pub.elara.patract.io/polkadot",
};

function _getApi() {
  return getApi(nodeSetting);
}

module.exports = {
  ...Networks.Polkadot,
  nodeSetting,
  getApi: _getApi,
  proposeThreshold,
  weightStrategy,
};
