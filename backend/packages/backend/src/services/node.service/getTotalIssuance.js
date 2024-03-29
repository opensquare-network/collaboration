const BigNumber = require("bignumber.js");
const { HttpError } = require("../../exc");
const { fetchApi } = require("../../utils/fech.api");
const { NODE_API_ENDPOINT } = require("../../env");

// TODO: Different tokens may have same name, but we will handle this case in the future.
async function getTotalIssuance(tokenName, blockHeight) {
  const url = `${NODE_API_ENDPOINT}/issuance/token/${tokenName}/${
    blockHeight || ""
  }`;
  try {
    const { totalIssuance } = await fetchApi(url);
    return new BigNumber(totalIssuance).toString();
  } catch (err) {
    throw new HttpError(500, "Failed to get token total issuance");
  }
}

module.exports = {
  getTotalIssuance,
};
