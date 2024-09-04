const { Accessibility } = require("../../consts/space");
const { networks } = require("./consts");
const { statemineCommonConfig, strategies } = require("./consts");

const statemineAssetConfig = {
  ...statemineCommonConfig,
  assets: [
    {
      type: "asset",
      assetId: 8,
      symbol: "RMRK",
      decimals: 10,
      votingThreshold: "10000000000",
    },
  ],
};

const karuraTokenConfig = {
  network: networks.karura,
  ss58Format: 8,
  assets: [
    {
      type: "token",
      symbol: "RMRK",
      decimals: 10,
      votingThreshold: "10000000000",
    },
  ],
};

const bifrostTokenConfig = {
  network: networks.bifrost,
  ss58Format: 6,
  assets: [
    {
      type: "token",
      symbol: "RMRK",
      decimals: 10,
      votingThreshold: "10000000000",
    },
  ],
};

const rmrkMovrConfig = {
  network: networks.moonriver,
  assets: [
    {
      type: "erc20",
      contract: "0xffffffFF893264794d9d57E1E0E21E0042aF5A0A",
      symbol: "RMRK",
      decimals: 10,
      votingThreshold: "10000000000",
    },
  ],
};

const config = {
  id: "rmrk",
  name: "RMRK",
  symbol: "RMRK",
  decimals: 10,
  accessibility: Accessibility.PUBLIC,
  networks: [
    statemineAssetConfig,
    karuraTokenConfig,
    bifrostTokenConfig,
    rmrkMovrConfig,
  ],
  proposeThreshold: "500000000000000",
  weightStrategy: [
    strategies.balanceOf,
    strategies.quadraticBalanceOf,
    strategies.biasedVoting,
  ],
  version: "4",
  spaceIcon: "rmrk.svg",
  seoImage: "bafybeibhjq4ls327o52xm76zgabalkltmdofzku57sfjw2afsao3ud2yjq",
  admins: [],
};

const curationConfig = {
  id: "rmrk-curation",
  name: "RMRK Curation",
  symbol: "RMRK",
  decimals: 10,
  accessibility: Accessibility.PUBLIC,
  networks: [
    statemineAssetConfig,
    karuraTokenConfig,
    bifrostTokenConfig,
    rmrkMovrConfig,
  ],
  proposeThreshold: "4310000000000",
  weightStrategy: [
    strategies.balanceOf,
    strategies.quadraticBalanceOf,
    strategies.biasedVoting,
  ],
  version: "4",
  spaceIcon: "rmrk-curation.png",
  seoImage: "bafybeic42ekrlmnjdwfi3kdshqfuvo76yhugu5nbkewebnigjxxe5hqjty",
  admins: [],
};

module.exports = {
  rmrkConfig: config,
  rmrkCurationConfig: curationConfig,
};
