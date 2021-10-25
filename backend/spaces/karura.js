const { typesBundleForPolkadot } = require("@acala-network/type-definitions");
const { getApi } = require("../utils/polkadotApi");
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

module.exports = {
  ...Networks.Karura,
  relay: Networks.Kusama,
  nodeSetting,
  getApi: getApi.bind(null, nodeSetting),
  proposeThreshold,
  weightStrategy,
};
