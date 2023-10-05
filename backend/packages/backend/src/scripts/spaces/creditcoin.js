const { strategies } = require("../../consts/voting");
const { networks } = require("../../consts/networks");

const config = {
  id: "creditcoin",
  name: "Creditcoin",
  symbol: "CTC",
  decimals: 18,
  networks: [
    {
      network: networks.creditcoin,
      ss58Format: 42,
      assets: [
        {
          symbol: "CTC",
          decimals: 18,
          votingThreshold: "1000000000000000000",
        },
      ],
    },
  ],
  proposeThreshold: "1000000000000000000000",
  weightStrategy: [strategies.balanceOf, strategies.quadraticBalanceOf],
  version: "4",
  spaceIcon: "creditcoin.png",
  seoImage: "bafybeihijmhds4sz6dn4m3mcx4idayzmxotm5nddzrcx2ul4elqcgx7ate",
};

module.exports = {
  creditcoinConfig: config,
};
