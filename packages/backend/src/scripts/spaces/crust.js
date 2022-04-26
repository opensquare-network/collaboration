const { strategies } = require("../../consts/voting");
const { networks } = require("../../consts/networks");

const config = {
  id: "crust",
  name: "Crust",
  symbol: "CRU",
  decimals: 12,
  networks: [
    {
      network: networks.crust,
      ss58Format: 66,
      decimals: 12,
    },
  ],
  proposeThreshold: "10000000000",
  voteThreshold: "10000000000",
  weightStrategy: [strategies.balanceOf, strategies.quadraticBalanceOf],
  version: "2",
};

module.exports = {
  crustConfig: config,
};
