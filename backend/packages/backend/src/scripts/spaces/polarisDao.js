const { karuraTokenConfig, networks, strategies } = require("./consts");

const polarisDaoConfig = {
  id: "polarisdao",
  name: "PolarisDAO",
  symbol: "ARIS",
  decimals: 8,
  networks: [
    {
      type: "asset",
      network: networks.statemine,
      ss58Format: 2,
      assetId: 16,
    },
    karuraTokenConfig,
  ],
  proposeThreshold: "4000000000000",
  voteThreshold: "1000000",
  weightStrategy: [
    strategies.balanceOf,
    strategies.quadraticBalanceOf,
    strategies.biasedVoting,
  ],
  version: "3",
  spaceIcon: "polarisdao.svg",
  seoImage: "bafybeiha6qqajks5sava3rdkkxbgjaexijnr4vzvsvf6xfprjei745pc3y",
};

module.exports = {
  polarisDaoConfig,
};
