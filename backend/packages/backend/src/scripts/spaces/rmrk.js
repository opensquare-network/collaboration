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
  version: "3",
  spaceIcon: "rmrk.svg",
  seoImage: "bafybeibhjq4ls327o52xm76zgabalkltmdofzku57sfjw2afsao3ud2yjq",
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
  version: "3",
  spaceIcon: "rmrk-curation.png",
  smallSpaceIcon: "project-rmrk-curation.svg",
  seoImage: "bafybeic42ekrlmnjdwfi3kdshqfuvo76yhugu5nbkewebnigjxxe5hqjty",
};

module.exports = {
  rmrkConfig: config,
  rmrkCurationConfig: curationConfig,
};
