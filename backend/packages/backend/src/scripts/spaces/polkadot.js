const { Accessibility } = require("../../consts/space");
const { networks, strategies } = require("./consts");

const polkadotConfig = {
  id: "polkadot",
  name: "Polkadot",
  symbol: "DOT",
  decimals: 10,
  accessibility: Accessibility.PUBLIC,
  networks: [
    {
      network: networks.polkadot,
      ss58Format: 0,
      assets: [
        {
          symbol: "DOT",
          decimals: 10,
          votingThreshold: "100000000",
        },
      ],
    },
  ],
  proposeThreshold: "10000000000",
  weightStrategy: [strategies.balanceOf, strategies.quadraticBalanceOf],
  version: "4",
  spaceIcon: "polkadot.svg",
  seoCoverFilename: "polkadot.jpg",
  admins: [],
};

module.exports = {
  polkadotConfig,
};
