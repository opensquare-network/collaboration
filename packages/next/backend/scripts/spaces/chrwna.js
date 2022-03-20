const { statemineCommonConfig } = require("./consts");
const config = {
  id: "chrwna",
  name: "Chrawnna",
  symbol: "CHRWNA",
  decimals: 10,
  networks: [
    {
      ...statemineCommonConfig,
      assetId: 567,
    },
  ],
  proposeThreshold: "50000000000",
  voteThreshold: "1000000000",
  weightStrategy: ["balance-of", "quadratic-balance-of"],
  version: "2",
};

module.exports = {
  chrwnaConfig: config,
};
