const { networks, strategies } = require("./consts");

const polarisDaoConfig = {
  id: "polarisdao",
  name: "PolarisDAO",
  symbol: "ARIS",
  decimals: 8,
  networks: [
    {
      network: networks.statemine,
      ss58Format: 2,
      assets: [
        {
          type: "asset",
          assetId: 16,
          symbol: "ARIS",
          decimals: 8,
          votingThreshold: "1000000",
        },
      ],
    },
    {
      network: networks.karura,
      ss58Format: 8,
      assets: [
        {
          type: "token",
          symbol: "ARIS",
          decimals: 8,
          votingThreshold: "1000000",
        },
      ],
    },
  ],
  proposeThreshold: "4000000000000",
  weightStrategy: [
    strategies.balanceOf,
    strategies.quadraticBalanceOf,
    strategies.biasedVoting,
  ],
  version: "4",
  spaceIcon: "polarisdao.svg",
  seoImage: "bafybeiha6qqajks5sava3rdkkxbgjaexijnr4vzvsvf6xfprjei745pc3y",
};

module.exports = {
  polarisDaoConfig,
};
