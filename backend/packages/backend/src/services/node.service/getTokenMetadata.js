const { HttpError } = require("../../exc");
const { NODE_API_ENDPOINT } = require("../../env");
const { fetchApi } = require("../../utils/fech.api");

async function getTokenMetadata(network, assetIdOrSymbol) {
  let url = `${NODE_API_ENDPOINT}/${network}/token/${assetIdOrSymbol}/metadata`;
  try {
    return await fetchApi(url);
  } catch (err) {
    throw new HttpError(500, "Failed to get token metadata");
  }
}

module.exports = {
  getTokenMetadata,
};
