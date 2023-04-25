const { statemineCommonConfig, strategies } = require("./consts");

const config = {
  id: "chrwna",
  name: "Chrawnna",
  symbol: "CHRWNA",
  decimals: 10,
  networks: [
    {
      ...statemineCommonConfig,
      assets: [
        {
          type: "asset",
          symbol: "CHRWNA",
          decimals: 10,
          assetId: 567,
          votingThreshold: "1000000000",
        },
      ],
    },
  ],
  proposeThreshold: "50000000000",
  weightStrategy: [strategies.balanceOf, strategies.quadraticBalanceOf],
  version: "4",
  spaceIcon: "chrwna.svg",
};

module.exports = {
  chrwnaConfig: config,
};
