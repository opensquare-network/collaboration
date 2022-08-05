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

function getEnvDecooIpfsEndpoint() {
  return process.env[`DECOO_IPFS_ENDPOINT`];
}

module.exports = {
  getEnvNodeApiEndpoint,
  getEnvDecooApiToken,
  getEnvDecooApiSecretKey,
  getEnvDecooApiOAuthEndpoint,
  getEnvDecooApiUploadEndpoint,
  getEnvDecooIpfsEndpoint,
};
