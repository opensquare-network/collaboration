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
    return networkBalance;
  }

  const bigBalance = new BigNumber(networkBalance);
  if (bigBalance.isNaN()) {
    throw new Error("Invalid balance to adapt");
  }

  if (other > primary) {
    return bigBalance.dividedBy(Math.pow(10, other - primary)).toNumber();
  } else {
    return bigBalance.multipliedBy(Math.pow(10, primary - other)).toNumber();
  }
}

module.exports = {
  adaptBalance,
};
