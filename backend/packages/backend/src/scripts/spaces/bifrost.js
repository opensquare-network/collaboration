const { Accessibility } = require("../../consts/space");
const { networks, strategies } = require("./consts");

const bifrostConfig = {
  id: "bifrost",
  name: "Bifrost",
  symbol: "BNC",
  decimals: 12,
  accessibility: Accessibility.PUBLIC,
  networks: [
    {
      network: networks.bifrost,
      ss58Format: 6,
      assets: [
        {
          symbol: "BNC",
          decimals: 12,
          votingThreshold: "10000000000",
        },
      ],
    },
    {
      network: networks.karura,
      ss58Format: 8,
      assets: [
        {
          type: "token",
          symbol: "BNC",
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
          contract: "0xfffffffff075423be54811ecb478e911f22dde7d",
          symbol: "BNC",
          decimals: 12,
          votingThreshold: "10000000000",
        },
      ],
    },
  ],
  proposeThreshold: "1000000000000",
  weightStrategy: [strategies.balanceOf, strategies.quadraticBalanceOf],
  version: "4",
  spaceIcon: "bifrost.svg",
  seoCoverFilename: "bifrost.jpg",
  admins: [],
};

module.exports = {
  bifrostConfig,
};
