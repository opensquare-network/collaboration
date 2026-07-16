const { Accessibility } = require("../../consts/space");
const { strategies } = require("./consts");

const khalaConfig = {
  id: "khala",
  inactive: true,
  name: "Khala",
  symbol: "PHA",
  decimals: 12,
  accessibility: Accessibility.PUBLIC,
  networks: [
    {
      network: "khala",
      ss58Format: 30,
      assets: [
        {
          symbol: "PHA",
          decimals: 12,
          votingThreshold: "10000000000",
        },
      ],
    },
  ],
  proposeThreshold: "10000000000000",
  weightStrategy: [strategies.balanceOf, strategies.quadraticBalanceOf],
  version: "4",
  spaceIcon: "khala.svg",
  seoCoverFilename: "khala.jpg",
  admins: [],
};

module.exports = {
  khalaConfig,
};
