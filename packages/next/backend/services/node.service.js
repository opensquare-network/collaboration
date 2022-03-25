const axios = require("axios");
const BigNumber = require("bignumber.js");
const { evmNetworks } = require("../consts/networks");
const { HttpError } = require("../exc");
const { getEnvNodeApiEndpoint } = require("../env");
const { isTestAccount } = require("../utils");

const cachedApis = {};

let nodeApi = null;

function getNodeApi() {
  if (!nodeApi) {
    nodeApi = axios.create({
      baseURL: `${getEnvNodeApiEndpoint()}/`,
    });
  }

  return nodeApi;
}

function getApi(chain) {
  if (!cachedApis[chain]) {
    cachedApis[chain] = axios.create({
      baseURL: `${getEnvNodeApiEndpoint()}/${chain}/`,
    });
  }

  return cachedApis[chain];
}

async function getSystemBalance(api, blockHeight, address) {
  if (isTestAccount(address)) {
    return {
      free: process.env.TEST_ACCOUNT_BALANCE || "10000000000000",
      reserved: 0,
    };
  }

  try {
    const result = await api.get(`/balance/${address}/${blockHeight}`);
    return result.data;
  } catch (err) {
    throw new HttpError(500, "Failed to get account balance");
  }
}

async function checkDelegation(api, delegatee, delegator, blockHeight) {
  if (isTestAccount(delegator)) {
    return;
  }

  let isProxy = false;
  try {
    const result = await api.get(
      `/proxy/${delegator}/${delegatee}/${blockHeight}`
    );
    isProxy = result.data.isProxy;
  } catch (err) {
    throw new HttpError(500, "Failed to verify the proxy address");
  }

  if (!isProxy) {
    throw new HttpError(400, "You are not a proxy of the given address");
  }
}

async function getEvmAddressBalance(network, contract, address, height) {
  let url = `${getEnvNodeApiEndpoint()}`;
  url += `/evm/chain/${network}/contract/${contract}/address/${address}/height/${height}`;

  const response = await axios.get(url);
  return response.data;
}

async function getChainHeight(chain, time) {
  let url = `${getEnvNodeApiEndpoint()}/`;
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
    const response = await axios.get(url);
    return response.data;
  } catch (e) {
    throw new HttpError(500, "Failed to get chain height");
  }
}

async function getFinalizedHeight(api) {
  try {
    const result = await api.get("/chain/height");
    return result.data;
  } catch (err) {
    throw new HttpError(500, "Failed to get chain height");
  }
}

async function getTotalBalance(api, blockHeight, address) {
  const { free, reserved } = await getSystemBalance(api, blockHeight, address);
  return new BigNumber(free || 0).plus(reserved || 0).toString();
}

async function getTokenBalance(api, assetIdOrSymbol, blockHeight, address) {
  if (isTestAccount(address)) {
    return process.env.TEST_ACCOUNT_BALANCE;
  }

  try {
    const result = await api.get(
      `/token/${assetIdOrSymbol}/account/${address}/${blockHeight}`
    );
    const { data: { free, reserved } = {} } = result;
    return new BigNumber(free || 0).plus(reserved || 0).toString();
  } catch (err) {
    throw new HttpError(500, "Failed to get account token balance");
  }
}

function getBalanceFromNetwork(
  api,
  { networksConfig, networkName, address, blockHeight }
) {
  const symbol = networksConfig?.symbol;
  const network = networksConfig?.networks?.find(
    (n) => n.network === networkName
  );
  if (!network) {
    throw new HttpError(400, "Network not found");
  }
  const { type, assetId } = network;

  if (type === "asset") {
    return getTokenBalance(api, assetId, blockHeight, address);
  } else if (type === "token") {
    return getTokenBalance(api, symbol, blockHeight, address);
  } else {
    return getTotalBalance(api, blockHeight, address);
  }
}

async function getFinalizedHeightFromTime(api, time) {
  try {
    const result = await api.get("/chain/height", {
      params: {
        time,
      },
    });
    return result.data;
  } catch (err) {
    throw new HttpError(500, "Failed to get block height from time");
  }
}

module.exports = {
  getTotalBalance,
  getTokenBalance,
  checkDelegation,
  getFinalizedHeight,
  getApi,
  getBalanceFromNetwork,
  getFinalizedHeightFromTime,
  getNodeApi,
  getChainHeight,
  getEvmAddressBalance,
};
