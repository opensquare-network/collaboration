const { networks, strategies } = require("./consts");

const hydradxConfig = {
  id: "hydradx",
  name: "HydraDX",
  symbol: "HDX",
  decimals: 12,
  networks: [
    {
      network: networks.hydradx,
      ss58Format: 63,
      assets: [
        {
          symbol: "HDX",
          decimals: 12,
        },
      ],
    },
  ],
  proposeThreshold: "1000000000000",
  voteThreshold: "10000000000",
  weightStrategy: [strategies.balanceOf, strategies.quadraticBalanceOf],
  version: "3",
};

module.exports = {
  hydradxConfig,
};
