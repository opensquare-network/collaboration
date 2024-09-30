const { strategies } = require("../../consts/voting");
const { networks } = require("../../consts/networks");
const { Accessibility } = require("../../consts/space");

const config = {
  id: "creditcoin",
  name: "Creditcoin Enterprise",
  symbol: "CTC",
  decimals: 18,
  accessibility: Accessibility.PUBLIC,
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
  seoCoverFilename: "creditcoin.jpg",
  admins: [],
};

module.exports = {
  creditcoinEnterpriseConfig: config,
};
