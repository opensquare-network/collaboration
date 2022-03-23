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
    },
  ],
  proposeThreshold: "10000000000000",
  voteThreshold: "10000000000",
  weightStrategy: [strategies.balanceOf, strategies.quadraticBalanceOf],
  version: "2",
};

module.exports = {
  khalaConfig,
};
