const { Accessibility } = require("../../consts/space");
const { networks, strategies } = require("./consts");

const config = {
  id: "karura",
  name: "Karura",
  symbol: "KAR",
  decimals: 12,
  accessibility: Accessibility.PUBLIC,
  networks: [
    {
      network: networks.karura,
      ss58Format: 8,
      assets: [
        {
          symbol: "KAR",
          decimals: 12,
          votingThreshold: "10000000000",
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
          votingThreshold: "10000000000",
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
          votingThreshold: "10000000000",
        },
      ],
    },
  ],
  proposeThreshold: "1000000000000",
  weightStrategy: [
    strategies.balanceOf,
    strategies.quadraticBalanceOf,
    strategies.biasedVoting,
  ],
  version: "4",
  spaceIcon: "karura.svg",
  seoImage: "bafybeidqwvg6pjgcxs52ujondwclidzgvowj3osy2vegzywfcz7pzqygxy",
  admins: [],
};

module.exports = {
  karuraConfig: config,
};
