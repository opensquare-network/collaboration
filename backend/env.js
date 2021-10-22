function getEnvWeightStrategies(space) {
  return process.env[`SPACE_WEIGHT_STRATEGY_${space.toUpperCase()}`];
}

function getEnvProposeThreshold(space) {
  return process.env[`SPACE_PROPOSE_THRESHOLD_${space.toUpperCase()}`];
}

function getEnvNodeEndpoint(space) {
  return process.env[`${space.toUpperCase()}_NODE_ENDPOINT`];
}

module.exports = {
  getEnvWeightStrategies,
  getEnvProposeThreshold,
  getEnvNodeEndpoint,
};
