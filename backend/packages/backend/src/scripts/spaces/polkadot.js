const { networks, strategies } = require("./consts");

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
  weightStrategy: [strategies.balanceOf, strategies.quadraticBalanceOf],
  version: "2",
};

module.exports = {
  polkadotConfig,
};
