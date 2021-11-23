const { getApi, getTokenBalance } = require("../services/node.service");
const { WeightStrategy, Networks } = require("../constants");
const {
  getEnvWeightStrategies,
  getEnvProposeThreshold,
  getEnvVoteThreshold,
} = require("../env");

const SPACE_NAME = "RMRK";
const ASSET_ID = 8;
const ASSET_SYMBOL = "RMRK";
const ASSET_DECIMALS = 10;

const weightStrategy = (getEnvWeightStrategies(SPACE_NAME) || WeightStrategy.BalanceOf).split(",");
const proposeThreshold = getEnvProposeThreshold(SPACE_NAME) || "1000000000000";
const voteThreshold = getEnvVoteThreshold(SPACE_NAME) || "1000000000000";

async function _getApi() {
  return await getApi("statemine");
}

async function _getBalance(blockHeight, address) {
  const api = await _getApi();
  return await getTokenBalance(api, ASSET_ID, blockHeight, address);
}

module.exports = {
  name: SPACE_NAME,
  ...Networks.Statemine,
  symbol: ASSET_SYMBOL,
  decimals: ASSET_DECIMALS,
  relay: Networks.Kusama,
  proposeThreshold,
  voteThreshold,
  weightStrategy,
  getApi: _getApi,
  getBalance: _getBalance,
};
