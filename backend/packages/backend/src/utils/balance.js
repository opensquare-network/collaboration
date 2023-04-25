const isNil = require("lodash.isnil");
const BigNumber = require("bignumber.js");

function adaptBalance(networkBalance, networkDecimals, primaryDecimals) {
  const primary = parseInt(primaryDecimals);
  const other = parseInt(networkDecimals);

  if (
    isNil(networkDecimals) ||
    isNaN(primary) ||
    isNaN(other) ||
    primary === other
  ) {
    return new BigNumber(networkBalance);
  }

  const bigBalance = new BigNumber(networkBalance);
  if (bigBalance.isNaN()) {
    throw new Error("Invalid balance to adapt");
  }

  return bigBalance
    .times(Math.pow(10, primary - other))
    .integerValue(BigNumber.ROUND_DOWN);
}

module.exports = {
  adaptBalance,
};
