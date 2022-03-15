const { karuraTokenConfig } = require("./consts");

const config = {
  id: "kintsugi",
  name: "Kintsugi",
  symbol: "KINT",
  decimals: 12,
  networks: [
    {
      network: "kintsugi",
      ss58Format: 2092,
    },
    karuraTokenConfig,
  ],
  proposeThreshold: "1000000000000",
  voteThreshold: "10000000000",
  weightStrategy: ["balance-of", "quadratic-balance-of"],
  version: "2",
};

module.exports = {
  kintsugiConfig: config,
};
