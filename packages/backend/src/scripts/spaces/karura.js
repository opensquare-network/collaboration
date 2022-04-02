const { networks, strategies } = require("./consts");
const config = {
  id: "karura",
  name: "Karura",
  symbol: "KAR",
  decimals: 12,
  networks: [
    {
      network: networks.karura,
      ss58Format: 8,
    },
  ],
  proposeThreshold: "1000000000000",
  voteThreshold: "10000000000",
  weightStrategy: [strategies.balanceOf, strategies.quadraticBalanceOf],
  version: "2",
};

module.exports = {
  karuraConfig: config,
};
