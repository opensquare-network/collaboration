const { ApiPromise, WsProvider } = require("@polkadot/api");
const { HttpError } = require("../exc");
const { isTestAccount } = require("../utils");

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
  if (isTestAccount(address)) {
    return {
      free: process.env.TEST_ACCOUNT_BALANCE || "10000000000000",
      reserved: 0,
    };
  }

  const account = await api.query.system.account.at(blockHash, address);
  const accountData = account.toJSON()?.data;
  return accountData;
}

async function getBlockHash(api, blockHeight) {
  const hash = await api.rpc.chain.getBlockHash(blockHeight);
  return hash;
}

async function checkDelegation(api, delegatee, delegator, blockHash) {
  if (isTestAccount(delegator)) {
    return true;
  }

  const data = await api.query.proxy.proxies.at(blockHash, delegator);
  const [proxies] = data.toJSON() || [];

  const proxy = (proxies || [])
    .find(item => {
      if (![
        "Any",
        "NonTransfer",
        "Governance",
      ].includes(item.proxyType)) {
        return false;
      }

      if (item.delegate !== delegatee) {
        return false;
      }

      return true;
    });

  if (!proxy) {
    throw new HttpError(400, "You are not a proxy of the given address");
  }

  return true;
}

module.exports = {
  getApi,
  getSystemBalance,
  getBlockHash,
  checkDelegation,
};
