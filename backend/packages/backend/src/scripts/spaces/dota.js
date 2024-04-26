const { statemintCommonConfig, strategies } = require("./consts");

const statemintAssetConfig = {
  ...statemintCommonConfig,
  assets: [
    {
      type: "asset",
      assetId: 18,
      symbol: "DOTA",
      decimals: 4,
      votingThreshold: "10000",
    },
  ],
};

const config = {
  id: "dota",
  name: "DOTA",
  symbol: "DOTA",
  decimals: 4,
  networks: [statemintAssetConfig],
  proposeThreshold: "1000000",
  weightStrategy: [strategies.balanceOf, strategies.quadraticBalanceOf],
  version: "4",
  spaceIcon: "dota.svg",
  seoImage: "QmRY3R3ZZ3miYeATGueWjS2WXYEv5NQ5KpjnVF7WFhNi3w",
};

module.exports = {
  dotaConfig: config,
};
