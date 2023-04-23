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
      assets: [
        {
          symbol: "PDEX",
          decimals: 12,
          votingThreshold: "10000000000",
        },
      ],
    },
  ],
  proposeThreshold: "1000000000000",
  weightStrategy: [strategies.balanceOf, strategies.quadraticBalanceOf],
  version: "4",
  spaceIcon: "polkadex.svg",
  seoImage: "bafybeig3y3dlntpdhrge7v7vzdsq4poi6yuymvemmvqqptcbiisr3652ma",
};

module.exports = {
  polkadexConfig: config,
};
