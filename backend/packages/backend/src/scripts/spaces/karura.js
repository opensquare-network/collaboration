const { networks, strategies } = require("./consts");

const config = {
  id: "karura",
  name: "Karura",
  symbol: "KAR",
  decimals: 12,
  networks: [
    {
      network: networks.karura,
      ss58Format: 8,
      assets: [
        {
          symbol: "KAR",
          decimals: 12,
        },
      ],
    },
    {
      network: networks.moonriver,
      assets: [
        {
          type: "erc20",
          contract: "0xFfFFFFfF08220AD2E6e157f26eD8bD22A336A0A5",
          symbol: "KAR",
          decimals: 12,
        },
      ],
    },
    {
      network: networks.bifrost,
      ss58Format: 6,
      assets: [
        {
          type: "token",
          symbol: "KAR",
          decimals: 12,
        },
      ],
    },
  ],
  proposeThreshold: "1000000000000",
  voteThreshold: "10000000000",
  weightStrategy: [
    strategies.balanceOf,
    strategies.quadraticBalanceOf,
    strategies.biasedVoting,
  ],
  version: "3",
};

module.exports = {
  karuraConfig: config,
};
