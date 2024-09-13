const { Accessibility } = require("../../consts/space");
const { networks, strategies } = require("./consts");

const polarisDaoConfig = {
  id: "polarisdao",
  name: "PolarisDAO",
  symbol: "ARIS",
  decimals: 8,
  accessibility: Accessibility.PUBLIC,
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
  seoCoverFilename: "polarisdao.jpg",
  admins: [],
};

module.exports = {
  polarisDaoConfig,
};
