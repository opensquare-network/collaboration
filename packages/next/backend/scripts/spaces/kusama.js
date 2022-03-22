const { karuraTokenConfig, bifrostTokenConfig, networks } = require("./consts");

const config = {
  id: "kusama",
  name: "Kusama",
  symbol: "KSM",
  decimals: 12,
  networks: [
    {
      network: networks.kusama,
      ss58Format: 2,
    },
    {
      network: networks.statemine,
      ss58Format: 2,
    },
    karuraTokenConfig,
    bifrostTokenConfig,
  ],
  proposeThreshold: "10000000000",
  voteThreshold: "10000000000",
  weightStrategy: ["balance-of", "quadratic-balance-of"],
  version: "2",
};

module.exports = {
  kusamaConfig: config,
};
