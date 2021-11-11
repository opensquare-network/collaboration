function getEnvWeightStrategies(space) {
  return process.env[`SPACE_WEIGHT_STRATEGY_${space.toUpperCase()}`];
}

function getEnvProposeThreshold(space) {
  return process.env[`SPACE_PROPOSE_THRESHOLD_${space.toUpperCase()}`];
}

function getEnvNodeApiEndpoint() {
  return process.env[`NODE_API_ENDPOINT`];
}

module.exports = {
  getEnvWeightStrategies,
  getEnvProposeThreshold,
  getEnvNodeApiEndpoint,
};
