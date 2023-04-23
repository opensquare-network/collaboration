const { networks, strategies } = require("./consts");
const crabConfig = {
  id: "crab",
  name: "Crab",
  symbol: "CRAB",
  decimals: 9,
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
};

module.exports = {
  crabConfig,
};
