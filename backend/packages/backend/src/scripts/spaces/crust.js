const { ethErc20CommonConfig } = require("./consts");
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
    {
      ...ethErc20CommonConfig,
      contract: "0x32a7C02e79c4ea1008dD6564b35F131428673c41",
      decimals: 18,
    },
  ],
  proposeThreshold: "1000000000000",
  voteThreshold: "1000000000000",
  weightStrategy: [strategies.balanceOf, strategies.quadraticBalanceOf],
  version: "3",
};

module.exports = {
  crustConfig: config,
};
