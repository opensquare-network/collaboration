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
    },
  ],
  proposeThreshold: "10000000000",
  voteThreshold: "10000000000",
  weightStrategy: [strategies.balanceOf, strategies.quadraticBalanceOf],
  version: "2",
};

module.exports = {
  crabConfig,
};
