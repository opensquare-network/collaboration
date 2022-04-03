const { networks, strategies } = require("./consts");

const config = {
  id: "acala",
  name: "Acala",
  symbol: "ACA",
  decimals: 12,
  networks: [
    {
      network: networks.acala,
      ss58Format: 10,
    },
  ],
  proposeThreshold: "1000000000000",
  voteThreshold: "10000000000",
  weightStrategy: [strategies.balanceOf, strategies.quadraticBalanceOf],
  version: "2",
};

module.exports = {
  acalaConfig: config,
};
