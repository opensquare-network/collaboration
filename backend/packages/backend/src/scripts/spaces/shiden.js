const { networks, strategies } = require("./consts");

const shidenConfig = {
  id: "shiden",
  name: "Shiden",
  symbol: "SDN",
  decimals: 18,
  networks: [
    {
      network: networks.shiden,
      ss58Format: 5,
    },
  ],
  proposeThreshold: "100000000000000000000",
  voteThreshold: "1000000000000000000",
  weightStrategy: [strategies.balanceOf, strategies.quadraticBalanceOf],
  version: "3",
};

module.exports = {
  shidenConfig,
};
