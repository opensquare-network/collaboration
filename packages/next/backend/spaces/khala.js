const { getApi } = require("../services/node.service");
const { WeightStrategy, Networks } = require("../constants");
const {
  getEnvWeightStrategies,
  getEnvProposeThreshold,
  getEnvVoteThreshold,
} = require("../env");

const weightStrategy = (getEnvWeightStrategies("khala") || WeightStrategy.BalanceOf).split(",");
const proposeThreshold = getEnvProposeThreshold("khala") || "1000000000000";
const voteThreshold = getEnvVoteThreshold("khala") || "1000000000000";

module.exports = {
  ...Networks.Khala,
  relay: Networks.Kusama,
  getApi: getApi.bind(null, "khala"),
  proposeThreshold,
  voteThreshold,
  weightStrategy,
};
