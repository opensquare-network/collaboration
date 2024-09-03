const { Accessibility } = require("../../consts/space");
const { networks, strategies } = require("./consts");

const config = {
  id: "acala",
  name: "Acala",
  symbol: "ACA",
  decimals: 12,
  accessibility: Accessibility.PUBLIC,
  networks: [
    {
      network: networks.acala,
      ss58Format: 10,
      assets: [
        {
          symbol: "ACA",
          decimals: 12,
          votingThreshold: "100000000",
        },
      ],
    },
  ],
  proposeThreshold: "10000000000",
  weightStrategy: [
    strategies.balanceOf,
    strategies.quadraticBalanceOf,
    strategies.biasedVoting,
  ],
  version: "4",
  spaceIcon: "acala.svg",
  seoImage: "bafybeid6yjg7n2vh3kc34tv6wpqzr53bnbuij6nvxz5bkgvbi2jb5cy2mq",
  admins: [],
};

module.exports = {
  acalaConfig: config,
};
