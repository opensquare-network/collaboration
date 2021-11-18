const { getApi } = require("../services/node.service");
const { WeightStrategy, Networks } = require("../constants");
const {
  getEnvWeightStrategies,
  getEnvProposeThreshold,
  getEnvVoteThreshold,
} = require("../env");

const weightStrategy = (getEnvWeightStrategies("karura") || WeightStrategy.BalanceOf).split(",");
const proposeThreshold = getEnvProposeThreshold("karura") || "1000000000000";
const voteThreshold = getEnvVoteThreshold("karura") || "0.01";

module.exports = {
  ...Networks.Karura,
  relay: Networks.Kusama,
  getApi: getApi.bind(null, "karura"),
  proposeThreshold,
  voteThreshold,
  weightStrategy,
};
