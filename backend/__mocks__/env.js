const { WeightStrategy } = require("../constants");

function getEnvWeightStrategies(space) {
  return WeightStrategy.BalanceOf;
}

function getEnvProposeThreshold(space) {
  return "1000000000000";
}

function getEnvNodeEndpoint(space) {
  return "";
}

module.exports = {
  getEnvWeightStrategies,
  getEnvProposeThreshold,
  getEnvNodeEndpoint,
};
