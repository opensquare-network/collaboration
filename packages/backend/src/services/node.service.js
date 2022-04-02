const BigNumber = require("bignumber.js");
const { evmNetworks } = require("../consts/networks");
const { HttpError } = require("../exc");
const { getEnvNodeApiEndpoint } = require("../env");
const { isTestAccount } = require("../utils");
const fetch = require("node-fetch");

async function getSystemBalance(network, blockHeight, address) {
  if (isTestAccount(address)) {
    return {
      free: process.env.TEST_ACCOUNT_BALANCE || "10000000000000",
      reserved: 0,
    };
  }

  const url = `${getEnvNodeApiEndpoint()}/${network}/balance/${address}/${blockHeight}`;
  try {
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch (err) {
    throw new HttpError(500, "Failed to get account balance");
  }
}

async function checkDelegation(network, delegatee, delegator, blockHeight) {
  if (isTestAccount(delegator)) {
    return;
  }

  let url = `${getEnvNodeApiEndpoint()}/${network}/proxy/${delegator}/${delegatee}/${blockHeight}`;
  let isProxy = false;
  try {
    const response = await fetch(url);
    const json = await response.json();
    isProxy = json.isProxy;
  } catch (err) {
    throw new HttpError(500, "Failed to verify the proxy address");
  }

  if (!isProxy) {
    throw new HttpError(400, "You are not a proxy of the given address");
  }
}

async function getEvmAddressBalance(network, contract, address, height) {
  if (isTestAccount(address)) {
    return {
      balance: process.env.TEST_ACCOUNT_BALANCE || "10000000000000",
    };
  }

  let url = `${getEnvNodeApiEndpoint()}`;
  url += `/evm/chain/${network}/contract/${contract}/address/${address}/height/${height}`;

  const response = await fetch(url);
  const json = await response.json();
  return json;
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
    const response = await fetch(url);
    const json = await response.json();
    return json;
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

async function getTotalBalance(network, blockHeight, address) {
  const { free, reserved } = await getSystemBalance(
    network,
    blockHeight,
    address
  );
  return new BigNumber(free || 0).plus(reserved || 0).toString();
}

async function getTokenBalance(network, assetIdOrSymbol, blockHeight, address) {
  if (isTestAccount(address)) {
    return process.env.TEST_ACCOUNT_BALANCE;
  }

  let url = `${getEnvNodeApiEndpoint()}/${network}/token/${assetIdOrSymbol}/account/${address}/${blockHeight}`;
  try {
    const response = await fetch(url);
    const { free, reserved } = await response.json();
    return new BigNumber(free || 0).plus(reserved || 0).toString();
  } catch (err) {
    throw new HttpError(500, "Failed to get account token balance");
  }
}

async function getBalanceFromNetwork({
  networksConfig,
  networkName,
  address,
  blockHeight,
}) {
  const symbol = networksConfig?.symbol;
  const network = networksConfig?.networks?.find(
    (n) => n.network === networkName
  );
  if (!network) {
    throw new HttpError(400, "Network not found");
  }
  const { type, assetId, contract } = network;

  if ("erc20" === type) {
    const { balance } = await getEvmAddressBalance(
      networkName,
      contract,
      address,
      blockHeight
    );
    return balance;
  } else if (type === "asset") {
    return getTokenBalance(networkName, assetId, blockHeight, address);
  } else if (type === "token") {
    return getTokenBalance(networkName, symbol, blockHeight, address);
  } else {
    return getTotalBalance(networkName, blockHeight, address);
  }
}

module.exports = {
  getTotalBalance,
  getTokenBalance,
  checkDelegation,
  getFinalizedHeight,
  getBalanceFromNetwork,
  getChainHeight,
  getEvmAddressBalance,
};
