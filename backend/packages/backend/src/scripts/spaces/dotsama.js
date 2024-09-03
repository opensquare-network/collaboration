const { strategies } = require("../../consts/voting");
const { networks } = require("../../consts/networks");
const { Accessibility } = require("../../consts/space");

const config = {
  id: "dotsama",
  name: "DotSama",
  symbol: "VOTE",
  decimals: 10,
  accessibility: Accessibility.PUBLIC,
  networks: [
    {
      network: networks.polkadot,
      ss58Format: 0,
      assets: [
        {
          symbol: "DOT",
          decimals: 10,
          votingThreshold: "10000000000",
        },
      ],
    },
    {
      network: networks.kusama,
      ss58Format: 2,
      assets: [
        {
          symbol: "KSM",
          decimals: 12,
          multiplier: 10,
          votingThreshold: "1000000000000",
        },
      ],
    },
    {
      network: networks.statemine,
      ss58Format: 2,
      assets: [
        {
          symbol: "KSM",
          decimals: 12,
          multiplier: 10,
          votingThreshold: "1000000000000",
        },
      ],
    },
  ],
  proposeThreshold: "1000000000000",
  weightStrategy: [strategies.balanceOf, strategies.quadraticBalanceOf],
  version: "4",
  spaceIcon: "dotsama.svg",
  seoImage: "bafybeie2rgjfil5humlhb7sizikywk2klztqf2tlvz5kes4ou7m6japauy",
  admins: [],
};

module.exports = {
  dotsamaConfig: config,
};
