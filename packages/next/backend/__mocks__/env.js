const { WeightStrategy } = require("../constants");

function getEnvWeightStrategies(space) {
  return WeightStrategy.BalanceOf;
}

function getEnvProposeThreshold(space) {
  return "1000000000000";
}

function getEnvNodeApiEndpoint() {
  return "http://localhost:3223";
}

module.exports = {
  getEnvWeightStrategies,
  getEnvProposeThreshold,
  getEnvNodeApiEndpoint,
};
