const { WeightStrategy, Networks } = require("../constants");
const { getApi } = require("../utils/polkadotApi");
const {
  getEnvWeightStrategies,
  getEnvProposeThreshold,
} = require("../env");

const weightStrategy = (getEnvWeightStrategies("polkadot") || WeightStrategy.BalanceOf).split(",");
const proposeThreshold = getEnvProposeThreshold("polkadot") || "1000000000000";

module.exports = {
  ...Networks.Polkadot,
  getApi: getApi.bind(null, "polkadot"),
  proposeThreshold,
  weightStrategy,
};
