const { Accessibility } = require("../../consts/space");
const { networks, strategies } = require("./consts");
const crabConfig = {
  id: "crab",
  name: "Crab",
  symbol: "CRAB",
  decimals: 9,
  accessibility: Accessibility.PUBLIC,
  networks: [
    {
      network: networks.crab,
      ss58Format: 42,
      assets: [
        {
          symbol: "CRAB",
          decimals: 9,
          votingThreshold: "10000000000",
        },
      ],
    },
  ],
  proposeThreshold: "10000000000",
  weightStrategy: [strategies.balanceOf, strategies.quadraticBalanceOf],
  version: "4",
  spaceIcon: "crab.svg",
  admins: [],
};

module.exports = {
  crabConfig,
};
