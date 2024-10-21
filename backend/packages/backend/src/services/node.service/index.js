const { getTotalBalance } = require("./getTotalBalance");
const { getTokenBalance } = require("./getTokenBalance");
const { checkProxy } = require("./checkProxy");
const { getBalanceFromNetwork } = require("./getBalanceFromNetwork");
const { getChainHeight } = require("./getChainHeight");
const { getEvmAddressBalance } = require("./getEvmAddressBalance");
const { getTotalIssuance } = require("./getTotalIssuance");

module.exports = {
  getTotalBalance,
  getTokenBalance,
  checkProxy,
  getBalanceFromNetwork,
  getChainHeight,
  getEvmAddressBalance,
  getTotalIssuance,
};
