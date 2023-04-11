const { HttpError } = require("../../exc");
const { NODE_API_ENDPOINT } = require("../../env");
const { fetchApi } = require("../../utils/fech.api");

async function getDelegated(network, blockHeight, address) {
  const url = `${NODE_API_ENDPOINT}/${network}/democracy/account/${address}/delegatee?block=${blockHeight}`;
  try {
    return await fetchApi(url);
  } catch (err) {
    throw new HttpError(500, "Failed to get account's been delegated");
  }
}

module.exports = {
  getDelegated,
};
