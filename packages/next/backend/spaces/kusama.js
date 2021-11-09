const { WeightStrategy, Networks } = require("../constants");
const { getApi } = require("../utils/polkadotApi");
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

module.exports = {
  ...Networks.Kusama,
  nodeSetting,
  getApi: getApi.bind(null, nodeSetting),
  proposeThreshold,
  weightStrategy,
};
