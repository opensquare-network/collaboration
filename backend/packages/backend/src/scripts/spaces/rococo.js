const { networks, strategies } = require("./consts");

const rococoConfig = {
  id: "rococo",
  name: "Rococo",
  symbol: "ROC",
  decimals: 12,
  networks: [
    {
      network: networks.rococo,
      ss58Format: 42,
    },
  ],
  proposeThreshold: "1000000000000",
  voteThreshold: "10000000000",
  weightStrategy: [strategies.balanceOf, strategies.quadraticBalanceOf],
  version: "3",
};

module.exports = {
  rococoConfig,
};
