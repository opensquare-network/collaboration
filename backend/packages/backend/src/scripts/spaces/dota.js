const { Accessibility } = require("../../consts/space");
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
  accessibility: Accessibility.PUBLIC,
  networks: [statemintAssetConfig],
  proposeThreshold: "1000000",
  weightStrategy: [strategies.balanceOf, strategies.quadraticBalanceOf],
  version: "4",
  spaceIcon: "dota.svg",
  seoCoverFilename: "dota.jpg",
  admins: [],
};

module.exports = {
  dotaConfig: config,
};
