const { ApiPromise, WsProvider } = require("@polkadot/api");
const { HttpError } = require("../exc");
const { isTestAccount } = require("../utils");
const BigNumber = require("bignumber.js");

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

async function getBalance(api, blockHash, address) {
  if (isTestAccount(address)) {
    return {
      free: process.env.TEST_ACCOUNT_BALANCE || "10000000000000",
      reserved: 0,
    };
  }

  const blockApi = await api.at(blockHash);
  if (blockApi.query.system?.account) {
    const account = await blockApi.query.system.account(address);
    return account.toJSON()?.data;
  }

  if (blockApi.query.balances) {
    const free = await blockApi.query.balances.freeBalance(address);
    const reserved = await blockApi.query.balances.reservedBalance(address);
    return {
      free: free.toJSON(),
      reserved: reserved.toJSON(),
    };
  }

  return {
    free: 0,
    reserved: 0,
  }
}

async function getBalanceByHeight(api, blockHeight, address) {
  const blockHash = await getBlockHash(api, blockHeight);
  return await getBalance(api, blockHash, address);
}

async function getTotalBalance(api, blockHash, address) {
  const { free, reserved } = await getBalance(...arguments);
  return new BigNumber(free || 0).plus(reserved || 0).toString();
}

async function getTotalBalanceByHeight(api, blockHeight, address) {
  const { free, reserved } = await getBalanceByHeight(...arguments);
  return new BigNumber(free || 0).plus(reserved || 0).toString();
}

async function getBlockHash(api, blockHeight) {
  return await api.rpc.chain.getBlockHash(blockHeight);
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
  getBalance,
  getTotalBalance,
  getTotalBalanceByHeight,
  getBlockHash,
  checkDelegation,
};
