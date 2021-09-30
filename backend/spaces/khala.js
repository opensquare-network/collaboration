const BigNumber = require("bignumber.js");
const { typesBundleForPolkadot } = require("@acala-network/type-definitions");
const { getApi, getSystemBalance } = require("../utils/polkadotApi");
const { WeightStrategie } = require("../constants");

const nodeSetting = {
  nodeUrl: process.env.KHALA_NODE_ENDPOINT || "wss://khala-api.phala.network/ws",
  typesBundle: typesBundleForPolkadot,
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
  nodeSetting,
  getApi: _getApi,
  balanceOf,
  symbol: "KHA",
  ss58Format: 40,
  decimals: 12,
  proposeThreshold: "100000000000000",
  weightStrategie: WeightStrategie.BalanceOf,
};
