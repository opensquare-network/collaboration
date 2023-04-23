const { networks, strategies } = require("./consts");

const config = {
  id: "interlay",
  name: "Interlay",
  symbol: "INTR",
  decimals: 10,
  networks: [
    {
      network: networks.interlay,
      ss58Format: 2032,
      assets: [
        {
          symbol: "INTR",
          decimals: 10,
          votingThreshold: "10000000000",
        },
      ],
    },
  ],
  proposeThreshold: "10000000000",
  weightStrategy: [
    strategies.balanceOf,
    strategies.quadraticBalanceOf,
    strategies.biasedVoting,
  ],
  version: "4",
  spaceIcon: "interlay.svg",
  seoImage: "bafybeiaengdfa3yelfkx3hbrmnktvpjx3ht4uqaj5wd4sy6vknuctxroja",
};

module.exports = {
  interlayConfig: config,
};
