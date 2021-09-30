const { ApiPromise, WsProvider } = require("@polkadot/api");

const apiInstanceMap = new Map();

const getApi = async (nodeSetting) => {
  const nodeUrl = nodeSetting.nodeUrl;
  const typesBundle = nodeSetting.typesBundle;
  const types = nodeSetting.types;

  if (!apiInstanceMap.has(nodeUrl)) {
    const provider = new WsProvider(nodeUrl, 1000);
    const options = { provider };
    if (typesBundle) {
      options.typesBundle = typesBundle;
    }
    if (types) {
      options.types = types;
    }

    apiInstanceMap.set(nodeUrl, ApiPromise.create(options));
  }
  return apiInstanceMap.get(nodeUrl);
};

async function getSystemBalance(api, blockHash, address) {
  const account = await api.query.system.account.at(blockHash, address);
  const accountData = account.toJSON()?.data;
  return accountData;
}

async function getBlockHash(api, blockHeight) {
  const hash = await api.rpc.chain.getBlockHash(blockHeight);
  return hash;
}

module.exports = {
  getApi,
  getSystemBalance,
  getBlockHash,
};
