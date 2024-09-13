const { Accessibility } = require("../../consts/space");
const { networks, strategies } = require("./consts");

const parallelConfig = {
  id: networks.parallel,
  name: "Parallel",
  symbol: "PARA",
  decimals: 12,
  accessibility: Accessibility.PUBLIC,
  networks: [
    {
      network: networks.parallel,
      ss58Format: 172,
      assets: [
        {
          symbol: "PARA",
          decimals: 12,
          votingThreshold: "100000000000",
        },
      ],
    },
  ],
  proposeThreshold: "100000000000000",
  weightStrategy: [strategies.balanceOf, strategies.quadraticBalanceOf],
  version: "4",
  spaceIcon: "parallel.svg",
  seoCoverFilename: "parallel.jpg",
  admins: [],
};

module.exports = {
  parallelConfig,
};
