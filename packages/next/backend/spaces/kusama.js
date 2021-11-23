const { WeightStrategy, Networks } = require("../constants");
const { getApi, getTotalBalance } = require("../services/node.service");
const {
  getEnvWeightStrategies,
  getEnvProposeThreshold,
  getEnvVoteThreshold,
} = require("../env");

const SPACE_NAME = "kusama";

const weightStrategy = (getEnvWeightStrategies(SPACE_NAME) || WeightStrategy.BalanceOf).split(",");
const proposeThreshold = getEnvProposeThreshold(SPACE_NAME) || "1000000000000";
const voteThreshold = getEnvVoteThreshold(SPACE_NAME) || "1000000000000";

async function _getApi() {
  return await getApi("kusama");
}

async function _getBalance(blockHeight, address) {
  const api = await _getApi();
  return await getTotalBalance(api, blockHeight, address);
}

module.exports = {
  name: SPACE_NAME,
  ...Networks.Kusama,
  proposeThreshold,
  voteThreshold,
  weightStrategy,
  getApi: _getApi,
  getBalance: _getBalance,
};
