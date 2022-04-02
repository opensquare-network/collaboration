const { movrErc20CommonConfig } = require("./consts");
const {
  karuraTokenConfig,
  bifrostTokenConfig,
  statemineCommonConfig,
  strategies,
} = require("./consts");

const rmrkMovrConfig = {
  ...movrErc20CommonConfig,
  contract: "0xffffffFF893264794d9d57E1E0E21E0042aF5A0A",
};

const config = {
  id: "rmrk",
  name: "RMRK",
  symbol: "RMRK",
  decimals: 10,
  networks: [
    {
      ...statemineCommonConfig,
      assetId: 8,
    },
    karuraTokenConfig,
    bifrostTokenConfig,
    rmrkMovrConfig,
  ],
  proposeThreshold: "500000000000000",
  voteThreshold: "10000000000",
  weightStrategy: [
    strategies.balanceOf,
    strategies.quadraticBalanceOf,
    strategies.biasedVoting,
  ],
  version: "2",
};

const curationConfig = {
  id: "rmrk-curation",
  name: "RMRK Curation",
  symbol: "RMRK",
  decimals: 10,
  networks: [
    {
      ...statemineCommonConfig,
      assetId: 8,
    },
    karuraTokenConfig,
    bifrostTokenConfig,
    rmrkMovrConfig,
  ],
  proposeThreshold: "4310000000000",
  voteThreshold: "10000000000",
  weightStrategy: [
    strategies.balanceOf,
    strategies.quadraticBalanceOf,
    strategies.biasedVoting,
  ],
  version: "2",
};

module.exports = {
  rmrkConfig: config,
  rmrkCurationConfig: curationConfig,
};
