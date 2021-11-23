const axios = require("axios");
const BigNumber = require("bignumber.js");
const { HttpError } = require("../exc");
const { getEnvNodeApiEndpoint } = require("../env");
const { isTestAccount } = require("../utils");

const cachedApis = {};

function getApi(chain) {
  if (!cachedApis[chain]) {
    cachedApis[chain] = axios.create({
      baseURL: `${getEnvNodeApiEndpoint()}/${chain}/`,
    });
  }

  return cachedApis[chain];
}

async function getBalance(api, blockHeight, address) {
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

  const isProxy = false;
  try {
    const result = await api.get(`/proxy/${delegator}/${delegatee}/${blockHeight}`);
    isProxy = result.data.isProxy;
  } catch (err) {
    throw new HttpError(500, "Failed to verify the proxy address");
  }

  if (!isProxy) {
    throw new HttpError(400, "You are not a proxy of the given address");
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

module.exports = {
  getBalance,
  checkDelegation,
  getFinalizedHeight,
  getApi,
};
