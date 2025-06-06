const { Accessibility } = require("../../consts/space");
const { networks, strategies } = require("./consts");

const litentryConfig = {
  id: "litentry",
  name: "Litentry",
  symbol: "LIT",
  decimals: 12,
  accessibility: Accessibility.PUBLIC,
  networks: [
    {
      network: networks.litmus,
      ss58Format: 131,
      assets: [
        {
          symbol: "LIT",
          decimals: 12,
          votingThreshold: "10000000000",
        },
      ],
    },
    {
      network: networks.ethereum,
      assets: [
        {
          type: "erc20",
          contract: "0xb59490aB09A0f526Cc7305822aC65f2Ab12f9723",
          symbol: "LIT",
          decimals: 18,
          votingThreshold: "10000000000000000",
        },
      ],
    },
  ],
  proposeThreshold: "1000000000000",
  weightStrategy: [strategies.balanceOf, strategies.quadraticBalanceOf],
  version: "4",
  spaceIcon: "litentry.svg",
  seoCoverFilename: "litentry.jpg",
  admins: [],
};

module.exports = {
  litentryConfig,
};
