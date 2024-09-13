const { Accessibility } = require("../../consts/space");
const { networks, strategies } = require("./consts");

const altairConfig = {
  id: networks.altair,
  name: "Altair",
  symbol: "AIR",
  decimals: 18,
  accessibility: Accessibility.PUBLIC,
  networks: [
    {
      network: networks.altair,
      ss58Format: 136,
      assets: [
        {
          symbol: "AIR",
          decimals: 18,
          delegation: "democracy",
          isNative: true,
          votingThreshold: "1000000000000000000",
        },
      ],
    },
  ],
  proposeThreshold: "1000000000000000000",
  weightStrategy: [strategies.balanceOf, strategies.quadraticBalanceOf],
  version: "4",
  spaceIcon: "altair.svg",
  seoCoverFilename: "altair.jpg",
  admins: [],
};

module.exports = {
  altairConfig,
};
