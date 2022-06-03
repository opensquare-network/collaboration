const { ethErc20CommonConfig } = require("./consts");
const { strategies } = require("./consts");

const config = {
  id: "polkadex",
  name: "Polkadex",
  symbol: "PDEX",
  decimals: 12,
  networks: [
    {
      network: "polkadex",
      ss58Format: 88,
      decimals: 12,
    },
    {
      ...ethErc20CommonConfig,
      contract: "0xf59ae934f6fe444afc309586cc60a84a0f89aaea",
      decimals: 18,
    },
  ],
  proposeThreshold: "1000000000000",
  voteThreshold: "10000000000",
  weightStrategy: [strategies.balanceOf, strategies.quadraticBalanceOf],
  version: "2",
};

module.exports = {
  polkadexConfig: config,
};
