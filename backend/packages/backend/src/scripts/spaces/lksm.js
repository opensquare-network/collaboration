const { networks, strategies } = require("./consts");

const config = {
  id: "lksm",
  name: "LKSM",
  symbol: "VOTE",
  decimals: 12,
  networks: [
    {
      network: networks.karura,
      ss58Format: 8,
      assets: [
        {
          type: "token",
          symbol: "LKSM",
          decimals: 12,
        },
        {
          type: "token",
          symbol: "taiKSM",
          decimals: 12,
          multiplier: 5,
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
  lksmConfig: config,
};