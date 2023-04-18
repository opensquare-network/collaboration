const { networks, strategies } = require("./consts");

const ztgConfig = {
  id: "zeitgeist",
  name: "Zeitgeist",
  symbol: "ZTG",
  decimals: 10,
  networks: [
    {
      network: networks.zeitgeist,
      ss58Format: 73,
      assets: [
        {
          symbol: "ZTG",
          decimals: 10,
        },
      ],
    },
  ],
  proposeThreshold: "10000000000",
  voteThreshold: "100000000",
  weightStrategy: [strategies.balanceOf, strategies.quadraticBalanceOf],
  version: "3",
  spaceIcon: "zeitgeist.svg",
  seoImage: "bafybeie36tzyj37hqwaavdibymki5vekejtp3gfmorrxxrwkrmhopo5j6y",
};

module.exports = {
  zeitgeistConfig: ztgConfig,
};
