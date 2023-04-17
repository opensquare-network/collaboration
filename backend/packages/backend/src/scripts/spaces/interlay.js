const { networks, strategies } = require("./consts");

const config = {
  id: "interlay",
  name: "Interlay",
  symbol: "INTR",
  decimals: 10,
  networks: [
    {
      network: networks.interlay,
      ss58Format: 2032,
      assets: [
        {
          symbol: "INTR",
          decimals: 10,
        },
      ],
    },
  ],
  proposeThreshold: "10000000000",
  voteThreshold: "10000000000",
  weightStrategy: [
    strategies.balanceOf,
    strategies.quadraticBalanceOf,
    strategies.biasedVoting,
  ],
  version: "3",
};

module.exports = {
  interlayConfig: config,
};
