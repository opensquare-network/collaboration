const BigNumber = require("bignumber.js");
const { khala } = require("@phala/typedefs");
const { getApi, getSystemBalance } = require("../utils/polkadotApi");
const { WeightStrategy, Networks } = require("../constants");

const nodeSetting = {
  nodeUrl: process.env.KHALA_NODE_ENDPOINT || "wss://khala-api.phala.network/ws",
  types: khala,
};

function _getApi() {
  return getApi(nodeSetting);
}

async function balanceOf(api, blockHash, address) {
  const balance = await getSystemBalance(api, blockHash, address);
  const result = new BigNumber(balance?.free || 0).plus(balance?.reserved || 0).toString();
  return result;
}

module.exports = {
  ...Networks.Khala,
  relay: Networks.Kusama,
  nodeSetting,
  getApi: _getApi,
  balanceOf,
  proposeThreshold: process.env.SPACE_PROPOSE_THRESHOLD_KHALA || "10000000000000",
  weightStrategy: (process.env.SPACE_WEIGHT_STRATEGY_KHALA || WeightStrategy.BalanceOf).split(","),
};
