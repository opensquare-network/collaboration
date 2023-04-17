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
        },
      ],
    },
  ],
  proposeThreshold: "4000000000000",
  voteThreshold: "1000000",
  weightStrategy: [
    strategies.balanceOf,
    strategies.quadraticBalanceOf,
    strategies.biasedVoting,
  ],
  version: "3",
};

module.exports = {
  polarisDaoConfig,
};
