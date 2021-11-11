const { WeightStrategy, Networks } = require("../constants");
const { getApi } = require("../services/node.service");
const {
  getEnvWeightStrategies,
  getEnvProposeThreshold,
} = require("../env");

const weightStrategy = (getEnvWeightStrategies("kusama") || WeightStrategy.BalanceOf).split(",");
const proposeThreshold = getEnvProposeThreshold("kusama") || "1000000000000";

module.exports = {
  ...Networks.Kusama,
  getApi: getApi.bind(null, "kusama"),
  proposeThreshold,
  weightStrategy,
};
