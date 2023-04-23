const { networks, strategies } = require("./consts");

const parallelConfig = {
  id: networks.parallel,
  name: "Parallel",
  symbol: "PARA",
  decimals: 12,
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
  seoImage: "bafybeidtyeyfjpcwue2lqhogcq3ltxrkt6hqs7odlan46pamzuqesir2j4",
};

module.exports = {
  parallelConfig,
};
