const { strategies } = require("./consts");
const config = {
  id: "polkadex",
  name: "Polkadex",
  symbol: "PDEX",
  decimals: 12,
  networks: [
    {
      network: "polkadex",
      ss58Format: 88,
    },
  ],
  proposeThreshold: "1000000000000",
  voteThreshold: "10000000000",
  weightStrategy: [strategies.balanceOf, strategies.quadraticBalanceOf],
  version: "2",
};

module.exports = {
  polkadexConfig: config,
};
