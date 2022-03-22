const { networks } = require("./consts");

const polkadotConfig = {
  id: "polkadot",
  name: "Polkadot",
  symbol: "DOT",
  decimals: 10,
  networks: [
    {
      network: networks.polkadot,
      ss58Format: 0,
    },
  ],
  proposeThreshold: "10000000000",
  voteThreshold: "100000000",
  weightStrategy: ["balance-of", "quadratic-balance-of"],
  version: "2",
};

module.exports = {
  polkadotConfig,
};
