const { networks, strategies, ethErc20CommonConfig } = require("./consts");

const phalaConfig = {
  id: "phala",
  name: "Phala",
  symbol: "PHA",
  decimals: 12,
  networks: [
    {
      network: networks.phala,
      ss58Format: 30,
      decimals: 12,
    },
    {
      network: networks.khala,
      ss58Format: 30,
      decimals: 12,
    },
    {
      ...ethErc20CommonConfig,
      contract: "0x6c5bA91642F10282b576d91922Ae6448C9d52f4E",
      decimals: 18,
    },
  ],
  proposeThreshold: "10000000000000",
  voteThreshold: "10000000000",
  weightStrategy: [strategies.balanceOf, strategies.quadraticBalanceOf],
  version: "3",
};

module.exports = {
  phalaConfig,
};
