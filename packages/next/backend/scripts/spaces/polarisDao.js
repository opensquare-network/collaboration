const { karuraTokenConfig, networks } = require("./consts");

const polarisDaoConfig = {
  id: "polarisdao",
  name: "PolarisDAO",
  symbol: "ARIS",
  decimals: 8,
  networks: [
    {
      type: "asset",
      network: networks.statemine,
      ss58Format: 2,
      assetId: 16,
    },
    karuraTokenConfig,
  ],
  proposeThreshold: "4000000000000",
  voteThreshold: "1000000",
  weightStrategy: ["balance-of", "quadratic-balance-of", "biased-voting"],
};

module.exports = {
  polarisDaoConfig,
};
