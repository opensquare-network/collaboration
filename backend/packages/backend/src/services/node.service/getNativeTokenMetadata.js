const { HttpError } = require("../../exc");
const { NODE_API_ENDPOINT } = require("../../env");
const { fetchApi } = require("../../utils/fech.api");

async function getNativeTokenMetadata(network) {
  let url = `${NODE_API_ENDPOINT}/${network}/token/native/metadata`;
  try {
    return await fetchApi(url);
  } catch (err) {
    throw new HttpError(500, "Failed to get token metadata");
  }
}

module.exports = {
  getNativeTokenMetadata,
};
