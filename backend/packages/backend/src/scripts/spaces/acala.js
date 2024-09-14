const { Accessibility } = require("../../consts/space");
const { networks, strategies } = require("./consts");

const config = {
  id: "acala",
  name: "Acala",
  symbol: "ACA",
  decimals: 12,
  accessibility: Accessibility.PUBLIC,
  networks: [
    {
      network: networks.acala,
      ss58Format: 10,
      assets: [
        {
          symbol: "ACA",
          decimals: 12,
          votingThreshold: "100000000",
        },
      ],
    },
  ],
  proposeThreshold: "10000000000",
  weightStrategy: [
    strategies.balanceOf,
    strategies.quadraticBalanceOf,
    strategies.biasedVoting,
  ],
  version: "4",
  spaceIcon: "acala.svg",
  seoCoverFilename: "acala.jpg",
  admins: [],
};

module.exports = {
  acalaConfig: config,
};
