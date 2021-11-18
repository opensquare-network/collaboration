const { WeightStrategy, Networks } = require("../constants");
const { getApi } = require("../services/node.service");
const {
  getEnvWeightStrategies,
  getEnvProposeThreshold,
  getEnvVoteThreshold,
} = require("../env");

const weightStrategy = (getEnvWeightStrategies("polkadot") || WeightStrategy.BalanceOf).split(",");
const proposeThreshold = getEnvProposeThreshold("polkadot") || "1000000000000";
const voteThreshold = getEnvVoteThreshold("polkadot") || "0.01";

module.exports = {
  ...Networks.Polkadot,
  getApi: getApi.bind(null, "polkadot"),
  proposeThreshold,
  voteThreshold,
  weightStrategy,
};
