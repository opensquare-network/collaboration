const { evmNetworks } = require("../../consts/networks");
const { HttpError } = require("../../exc");
const { NODE_API_ENDPOINT } = require("../../env");
const { fetchApi } = require("../../utils/fech.api");

async function getChainHeight(chain, time) {
  let url = `${NODE_API_ENDPOINT}/`;
  if (evmNetworks.includes(chain)) {
    url += `evm/chain/${chain}/height`;
    if (time) {
      url += `/${time}`;
    }
  } else {
    url += `${chain}/chain/height`;
    if (time) {
      url += `?time=${time}`;
    }
  }

  try {
    return await fetchApi(url);
  } catch (e) {
    throw new HttpError(500, "Failed to get chain height");
  }
}

module.exports = {
  getChainHeight,
};
