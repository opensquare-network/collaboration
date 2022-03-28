const BigNumber = require("bignumber.js");
const { getNodeApi } = require("../node.service");
const { HttpError } = require("../../exc");

// TODO: Different tokens may have same name, but we will handle this case in the future.
async function getTotalIssuance(tokenName, blockHeight) {
  const url = `/issuance/token/${tokenName}/${blockHeight || ""}`;
  const api = getNodeApi();
  try {
    const {
      data: { totalIssuance },
    } = await api.get(url);
    return new BigNumber(totalIssuance).toString();
  } catch (err) {
    throw new HttpError(500, "Failed to get token total issuance");
  }
}

module.exports = {
  getTotalIssuance,
};
