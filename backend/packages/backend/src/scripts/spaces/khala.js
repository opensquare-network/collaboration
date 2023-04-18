const { networks, strategies } = require("./consts");

const khalaConfig = {
  id: "khala",
  name: "Khala",
  symbol: "PHA",
  decimals: 12,
  networks: [
    {
      network: networks.khala,
      ss58Format: 30,
      assets: [
        {
          symbol: "PHA",
          decimals: 12,
        },
      ],
    },
  ],
  proposeThreshold: "10000000000000",
  voteThreshold: "10000000000",
  weightStrategy: [strategies.balanceOf, strategies.quadraticBalanceOf],
  version: "3",
  spaceIcon: "khala.svg",
  seoImage: "bafybeihfumdgabiha5rc2tr5gpedo4zp2z6x4phzoqdjr45pmdmbyxghlm",
};

module.exports = {
  khalaConfig,
};
