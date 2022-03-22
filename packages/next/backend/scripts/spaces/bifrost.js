const { networks } = require("./consts");
const bifrostConfig = {
  id: "bifrost",
  name: "Bifrost",
  symbol: "BNC",
  decimals: 12,
  networks: [
    {
      network: networks.bifrost,
      ss58Format: 6,
    },
  ],
  proposeThreshold: "1000000000000",
  voteThreshold: "10000000000",
  weightStrategy: ["balance-of", "quadratic-balance-of"],
  version: "2",
};

module.exports = {
  bifrostConfig,
};
