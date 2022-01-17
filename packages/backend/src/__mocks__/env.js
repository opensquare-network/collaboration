const { WeightStrategy } = require("../constants");

function getEnvWeightStrategies(space) {
  return WeightStrategy.BalanceOf;
}

function getEnvProposeThreshold(space) {
  return "1000000000000";
}

function getEnvVoteThreshold(space) {
  return "1000000000000";
}

function getEnvNodeApiEndpoint() {
  return "http://localhost:3223";
}

function getEnvDecooApiToken() {
  return "xxx";
}

function getEnvDecooApiSecretKey() {
  return "yyy";
}

function getEnvDecooApiOAuthEndpoint() {
  return "https://api.decoo.io";
}

function getEnvDecooApiUploadEndpoint() {
  return "https://api-hk.decoo.io";
}

module.exports = {
  getEnvWeightStrategies,
  getEnvProposeThreshold,
  getEnvVoteThreshold,
  getEnvNodeApiEndpoint,
  getEnvDecooApiToken,
  getEnvDecooApiSecretKey,
  getEnvDecooApiOAuthEndpoint,
  getEnvDecooApiUploadEndpoint,
};
