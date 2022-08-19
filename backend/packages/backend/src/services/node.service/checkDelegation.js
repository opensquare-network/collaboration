const { HttpError } = require("../../exc");
const { NODE_API_ENDPOINT } = require("../../env");
const { isTestAccount } = require("../../utils");
const { fetchApi } = require("../../utils/fech.api");

async function checkDelegation(network, delegatee, delegator, blockHeight) {
  if (isTestAccount(delegator)) {
    return;
  }

  let url = `${NODE_API_ENDPOINT}/${network}/proxy/${delegator}/${delegatee}/${blockHeight}`;
  let isProxy = false;
  try {
    const json = await fetchApi(url);
    isProxy = json?.isProxy;
  } catch (err) {
    throw new HttpError(500, "Failed to verify the proxy address");
  }

  if (!isProxy) {
    throw new HttpError(400, "You are not a proxy of the given address");
  }
}

module.exports = {
  checkDelegation,
};
