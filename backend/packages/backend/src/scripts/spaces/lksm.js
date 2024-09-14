const { Accessibility } = require("../../consts/space");
const { networks, strategies } = require("./consts");

const config = {
  id: "lksm",
  name: "LKSM",
  symbol: "VOTE",
  decimals: 12,
  accessibility: Accessibility.PUBLIC,
  networks: [
    {
      network: networks.karura,
      ss58Format: 8,
      assets: [
        {
          type: "token",
          symbol: "LKSM",
          decimals: 12,
          votingThreshold: "10000000000",
        },
        {
          type: "token",
          symbol: "taiKSM",
          decimals: 12,
          multiplier: 5,
          votingThreshold: "10000000000",
        },
      ],
    },
  ],
  proposeThreshold: "1000000000000",
  weightStrategy: [strategies.balanceOf, strategies.quadraticBalanceOf],
  maxOptionsCount: 30,
  version: "4",
  spaceIcon: "lksm.svg",
  seoCoverFilename: "lksm.jpg",
  admins: [],
};

module.exports = {
  lksmConfig: config,
};
