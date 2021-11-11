const axios = require("axios");
const BigNumber = require("bignumber.js");
const { HttpError } = require("../exc");
const { getEnvNodeApiEndpoint } = require("../env");
const { isTestAccount } = require("../utils");

function getApi(chain) {
  return axios.create({
    baseURL: `${getEnvNodeApiEndpoint()}/${chain}/`,
  });
}

async function getBalance(api, blockHeight, address) {
  if (isTestAccount(address)) {
    return {
      free: process.env.TEST_ACCOUNT_BALANCE || "10000000000000",
      reserved: 0,
    };
  }

  const result = await api.get(`/balance/${address}/${blockHeight}`);
  return result.data;
}

async function getTotalBalance(api, blockHeight, address) {
  const { free, reserved } = await getBalance(...arguments);
  return new BigNumber(free || 0).plus(reserved || 0).toString();
}

async function checkDelegation(api, delegatee, delegator, blockHeight) {
  if (isTestAccount(delegator)) {
    return;
  }

  const result = await api.get(`/proxy/${delegator}/${delegatee}/${blockHeight}`);
  const { isProxy } = result.data;

  if (!isProxy) {
    throw new HttpError(400, "You are not a proxy of the given address");
  }
}

module.exports = {
  getBalance,
  getTotalBalance,
  checkDelegation,
  getApi,
};
