const { Accessibility } = require("../../consts/space");
const { networks, strategies } = require("./consts");

const basiliskConfig = {
  id: "basilisk",
  name: "Basilisk",
  symbol: "BSX",
  decimals: 12,
  accessibility: Accessibility.PUBLIC,
  networks: [
    {
      network: networks.basilisk,
      ss58Format: 10041,
      assets: [
        {
          symbol: "BSX",
          decimals: 12,
          votingThreshold: "10000000000",
        },
      ],
    },
  ],
  proposeThreshold: "1000000000000",
  weightStrategy: [strategies.balanceOf, strategies.quadraticBalanceOf],
  version: "4",
  spaceIcon: "basilisk.svg",
  admins: [],
  seoCoverFilename: "basilisk.jpg",
};

module.exports = {
  basiliskConfig,
};
