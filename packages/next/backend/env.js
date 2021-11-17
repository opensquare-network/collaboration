function getEnvWeightStrategies(space) {
  return process.env[`SPACE_WEIGHT_STRATEGY_${space.toUpperCase()}`];
}

function getEnvProposeThreshold(space) {
  return process.env[`SPACE_PROPOSE_THRESHOLD_${space.toUpperCase()}`];
}

function getEnvNodeApiEndpoint() {
  return process.env[`NODE_API_ENDPOINT`];
}

function getEnvDecooApiToken() {
  return process.env[`DECOO_API_TOKEN`];
}

function getEnvDecooApiSecretKey() {
  return process.env[`DECOO_API_SECRET_KEY`];
}

function getEnvDecooApiOAuthEndpoint() {
  return process.env[`DECOO_API_OAUTH_ENDPOINT`];
}

function getEnvDecooApiUploadEndpoint() {
  return process.env[`DECOO_API_UPLOAD_ENDPOINT`];
}

module.exports = {
  getEnvWeightStrategies,
  getEnvProposeThreshold,
  getEnvNodeApiEndpoint,
  getEnvDecooApiToken,
  getEnvDecooApiSecretKey,
  getEnvDecooApiOAuthEndpoint,
  getEnvDecooApiUploadEndpoint,
};
