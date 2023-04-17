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
        },
      ],
    },
  ],
  proposeThreshold: "100000000000000",
  voteThreshold: "100000000000",
  weightStrategy: [strategies.balanceOf, strategies.quadraticBalanceOf],
  version: "3",
};

module.exports = {
  parallelConfig,
};
