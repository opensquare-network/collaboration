const { Accessibility } = require("../../consts/space");
const { strategies } = require("./consts");

const config = {
  id: "polkadex",
  name: "Polkadex",
  symbol: "PDEX",
  decimals: 12,
  accessibility: Accessibility.PUBLIC,
  networks: [
    {
      network: "polkadex",
      ss58Format: 88,
      assets: [
        {
          symbol: "PDEX",
          decimals: 12,
          votingThreshold: "10000000000",
        },
      ],
    },
  ],
  proposeThreshold: "1000000000000",
  weightStrategy: [strategies.balanceOf, strategies.quadraticBalanceOf],
  version: "4",
  spaceIcon: "polkadex.svg",
  seoCoverFilename: "polkadex.jpg",
  admins: [],
};

module.exports = {
  polkadexConfig: config,
};
