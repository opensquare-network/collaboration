const BigNumber = require("bignumber.js");
const { HttpError } = require("../../exc");
const fetch = require("node-fetch");
const { getEnvNodeApiEndpoint } = require("../../env");

// TODO: Different tokens may have same name, but we will handle this case in the future.
async function getTotalIssuance(tokenName, blockHeight) {
  const url = `${getEnvNodeApiEndpoint()}/issuance/token/${tokenName}/${
    blockHeight || ""
  }`;
  try {
    const response = await fetch(url);
    const { totalIssuance } = await response.json();
    return new BigNumber(totalIssuance).toString();
  } catch (err) {
    throw new HttpError(500, "Failed to get token total issuance");
  }
}

module.exports = {
  getTotalIssuance,
};
