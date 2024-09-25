const { Accessibility } = require("../../consts/space");
const { networks, strategies } = require("./consts");

const bifrostPolkadotConfig = {
  id: "bifrost-polkadot",
  name: "Bifrost Polkadot",
  symbol: "BNC",
  decimals: 12,
  accessibility: Accessibility.PUBLIC,
  networks: [
    {
      network: networks.bifrostPolkadot,
      ss58Format: 6,
      assets: [
        {
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
  spaceIcon: "bifrost-polkadot.svg",
  seoCoverFilename: "bifrost_polkadot.jpg",
  admins: [],
};

module.exports = {
  bifrostPolkadotConfig,
};
