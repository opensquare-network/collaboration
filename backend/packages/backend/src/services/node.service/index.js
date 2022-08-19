const { getTotalBalance } = require("./getTotalBalance");
const { getTokenBalance } = require("./getTokenBalance");
const { checkDelegation } = require("./checkDelegation");
const { getBalanceFromNetwork } = require("./getBalanceFromNetwork");
const { getChainHeight } = require("./getChainHeight");
const { getEvmAddressBalance } = require("./getEvmAddressBalance");
const { getTotalIssuance } = require("./getTotalIssuance");

module.exports = {
  getTotalBalance,
  getTokenBalance,
  checkDelegation,
  getBalanceFromNetwork,
  getChainHeight,
  getEvmAddressBalance,
  getTotalIssuance,
};
