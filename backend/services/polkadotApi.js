const { ApiPromise, WsProvider } = require("@polkadot/api");
const spaces = require("../spaces");

const apiInstanceMap = new Map();

const getApi = async (chain) => {
  const nodeSetting = spaces[chain]?.nodeSetting;
  if (!nodeSetting) {
    throw new Error("Unknown chain name");
  }

  const nodeUrl = nodeSetting.nodeUrl;
  const typesBundle = nodeSetting.typesBundle;

  if (!apiInstanceMap.has(nodeUrl)) {
    const provider = new WsProvider(nodeUrl, 1000);
    const options = { provider };
    if (typesBundle) {
      options.typesBundle = typesBundle;
    }

    apiInstanceMap.set(nodeUrl, ApiPromise.create(options));
  }
  return apiInstanceMap.get(nodeUrl);
};

module.exports = {
  getApi,
};
