const { networks, strategies } = require("./consts");

const altairConfig = {
  id: networks.altair,
  name: "Altair",
  symbol: "AIR",
  decimals: 18,
  networks: [
    {
      network: networks.altair,
      ss58Format: 136,
      delegation: "democracy",
    },
  ],
  proposeThreshold: "1000000000000000000",
  voteThreshold: "1000000000000000000",
  weightStrategy: [strategies.balanceOf, strategies.quadraticBalanceOf],
  version: "2",
};

module.exports = {
  altairConfig,
};
