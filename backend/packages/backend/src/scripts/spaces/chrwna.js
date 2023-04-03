const { statemineCommonConfig, strategies } = require("./consts");
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
  weightStrategy: [strategies.balanceOf, strategies.quadraticBalanceOf],
  version: "3",
  spaceIcon: "chrwna.svg",
};

module.exports = {
  chrwnaConfig: config,
};
