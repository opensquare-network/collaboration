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

function getRmrkTotalIssuance() {
  return process.env[`RMRK_TOTAL_ISSUANCE`];
}

module.exports = {
  getEnvNodeApiEndpoint,
  getEnvDecooApiToken,
  getEnvDecooApiSecretKey,
  getEnvDecooApiOAuthEndpoint,
  getEnvDecooApiUploadEndpoint,
  getRmrkTotalIssuance,
};
