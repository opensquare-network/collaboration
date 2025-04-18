const { Accessibility } = require("../../consts/space");
const { networks, strategies } = require("./consts");

const turingConfig = {
  id: "turing",
  name: "Turing",
  symbol: "TUR",
  decimals: 10,
  accessibility: Accessibility.PUBLIC,
  networks: [
    {
      network: networks.turing,
      ss58Format: 51,
      assets: [
        {
          symbol: "TUR",
          decimals: 10,
          votingThreshold: "10000000000",
        },
      ],
    },
  ],
  proposeThreshold: "10000000000",
  weightStrategy: [strategies.balanceOf, strategies.quadraticBalanceOf],
  version: "4",
  spaceIcon: "turing.svg",
  seoCoverFilename: "turing.jpg",
  admins: [],
};

module.exports = {
  turingConfig,
};
