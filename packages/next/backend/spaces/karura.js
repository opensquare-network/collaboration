const { getApi, getBalance } = require("../services/node.service");
const { WeightStrategy, Networks } = require("../constants");
const {
  getEnvWeightStrategies,
  getEnvProposeThreshold,
  getEnvVoteThreshold,
} = require("../env");

const CHAIN = "karura";

const weightStrategy = (getEnvWeightStrategies(CHAIN) || WeightStrategy.BalanceOf).split(",");
const proposeThreshold = getEnvProposeThreshold(CHAIN) || "1000000000000";
const voteThreshold = getEnvVoteThreshold(CHAIN) || "1000000000000";

async function _getApi() {
  return await getApi(CHAIN);
}

async function _getBalance(blockHeight, address) {
  const api = await _getApi();
  return await getBalance(api, blockHeight, address);
}

module.exports = {
  ...Networks.Karura,
  relay: Networks.Kusama,
  proposeThreshold,
  voteThreshold,
  weightStrategy,
  getApi: _getApi,
  getBalance: _getBalance,
};
