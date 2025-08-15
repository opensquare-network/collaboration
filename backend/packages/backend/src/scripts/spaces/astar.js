const { Accessibility } = require("../../consts/space");
const { networks, strategies } = require("./consts");

const astarConfig = {
  id: "astar",
  name: "Astar",
  symbol: "ASTR",
  decimals: 18,
  accessibility: Accessibility.PUBLIC,
  networks: [
    {
      network: networks.astar,
      ss58Format: 5,
      assets: [
        {
          symbol: "ASTR",
          decimals: 18,
          votingThreshold: "1000000000000000000",
        },
      ],
    },
    {
      network: networks.astar_evm,
      assets: [
        {
          type: "evm_native",
          symbol: "ASTR",
          decimals: 18,
          votingThreshold: "1000000000000000000",
          duplicateOf: { network: networks.astar, symbol: "ASTR" },
        },
      ],
    },
  ],
  proposeThreshold: "1000000000000000000",
  weightStrategy: [strategies.balanceOf, strategies.quadraticBalanceOf],
  version: "4",
  spaceIcon: "astar.svg",
  seoCoverFilename: "astar.jpg",
  admins: [],
};

module.exports = {
  astarConfig,
};
