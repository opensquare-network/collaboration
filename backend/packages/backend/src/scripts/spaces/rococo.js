const { Accessibility } = require("../../consts/space");
const { strategies } = require("./consts");

const rococoConfig = {
  id: "rococo",
  inactive: true,
  name: "Rococo",
  symbol: "ROC",
  decimals: 12,
  accessibility: Accessibility.PUBLIC,
  networks: [
    {
      network: "rococo",
      ss58Format: 42,
      assets: [
        {
          symbol: "ROC",
          decimals: 12,
          delegation: "democracy",
          isNative: true,
          votingThreshold: "10000000000",
        },
      ],
    },
  ],
  proposeThreshold: "1000000000000",
  weightStrategy: [strategies.balanceOf, strategies.quadraticBalanceOf],
  version: "4",
  spaceIcon: "rococo.svg",
  seoCoverFilename: "rococo.jpg",
  admins: [],
};

module.exports = {
  rococoConfig,
};
