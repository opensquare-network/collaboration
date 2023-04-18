const { networks, strategies } = require("./consts");

const config = {
  id: "acala",
  name: "Acala",
  symbol: "ACA",
  decimals: 12,
  networks: [
    {
      network: networks.acala,
      ss58Format: 10,
      assets: [
        {
          symbol: "ACA",
          decimals: 10,
        },
      ],
    },
  ],
  proposeThreshold: "1000000000000",
  voteThreshold: "10000000000",
  weightStrategy: [
    strategies.balanceOf,
    strategies.quadraticBalanceOf,
    strategies.biasedVoting,
  ],
  version: "3",
  spaceIcon: "shiden.svg",
  seoImage: "bafybeibf43ntawbzkd3ucwtogab64xfz4e6qoledxx27nifm4dkj6ckfie",
};

module.exports = {
  acalaConfig: config,
};
