const { strategies } = require("../../consts/voting");
const { networks } = require("../../consts/networks");

const config = {
  id: "dotsama",
  name: "DotSama",
  symbol: "VOTE",
  decimals: 10,
  networks: [
    {
      network: networks.polkadot,
      ss58Format: 0,
    },
    {
      network: networks.kusama,
      ss58Format: 2,
      decimals: 11,
    },
  ],
  proposeThreshold: "10000000000",
  voteThreshold: "10000000000",
  weightStrategy: [strategies.balanceOf, strategies.quadraticBalanceOf],
  version: "2",
};

module.exports = {
  dotsamaConfig: config,
};
