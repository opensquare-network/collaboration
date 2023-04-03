const { strategies } = require("../../consts/voting");
const { networks } = require("../../consts/networks");

const config = {
  id: "dotsama",
  name: "DotSama",
  symbol: "VOTE",
  decimals: 10,
  networks: [
    {
      network: networks.polkadot,
      ss58Format: 0,
      symbol: "DOT",
      decimals: 10,
    },
    {
      network: networks.kusama,
      ss58Format: 2,
      symbol: "KSM",
      decimals: 12,
      multiplier: 10,
    },
    {
      network: networks.statemine,
      ss58Format: 2,
      symbol: "KSM",
      decimals: 12,
      multiplier: 10,
    },
  ],
  proposeThreshold: "1000000000000",
  voteThreshold: "10000000000",
  weightStrategy: [strategies.balanceOf, strategies.quadraticBalanceOf],
  version: "3",
  spaceIcon: "dotsama.svg",
  seoImage: "bafybeie2rgjfil5humlhb7sizikywk2klztqf2tlvz5kes4ou7m6japauy",
};

module.exports = {
  dotsamaConfig: config,
};
