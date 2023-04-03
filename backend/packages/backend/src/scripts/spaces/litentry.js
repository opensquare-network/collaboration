const { networks, strategies, ethErc20CommonConfig } = require("./consts");

const litentryConfig = {
  id: "litentry",
  name: "Litentry",
  symbol: "LIT",
  decimals: 12,
  networks: [
    {
      network: networks.litmus,
      ss58Format: 131,
      decimals: 12,
    },
    {
      ...ethErc20CommonConfig,
      contract: "0xb59490aB09A0f526Cc7305822aC65f2Ab12f9723",
      decimals: 18,
    },
  ],
  proposeThreshold: "1000000000000",
  voteThreshold: "10000000000",
  weightStrategy: [strategies.balanceOf, strategies.quadraticBalanceOf],
  version: "3",
  spaceIcon: "litentry.svg",
  seoImage: "bafybeidhd2cwbkha2fybrzir2xwj3au4nagycgm3vssdvmdlw744ny4734",
};

module.exports = {
  litentryConfig,
};
