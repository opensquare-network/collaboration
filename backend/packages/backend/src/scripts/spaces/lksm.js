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
  maxOptionsCount: 30,
  version: "3",
  spaceIcon: "lksm.svg",
  seoImage: "QmSgPB9aA4ZLre2VizBn6ufM3EAVB8aJUZC28oFkT3pm8Q",
};

module.exports = {
  lksmConfig: config,
};
