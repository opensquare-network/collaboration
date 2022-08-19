const { ethErc20CommonConfig } = require("./consts");
const { strategies } = require("../../consts/voting");
const { networks } = require("../../consts/networks");

const config = {
  id: "darwinia",
  name: "Darwinia",
  symbol: "RING",
  decimals: 9,
  networks: [
    {
      network: networks.darwinia,
      ss58Format: 18,
      decimals: 9,
    },
    {
      ...ethErc20CommonConfig,
      contract: "0x9469D013805bFfB7D3DEBe5E7839237e535ec483",
      decimals: 18,
    },
  ],
  proposeThreshold: "10000000000",
  voteThreshold: "1000000000",
  weightStrategy: [strategies.balanceOf, strategies.quadraticBalanceOf],
  version: "3",
};

module.exports = {
  darwiniaConfig: config,
};
