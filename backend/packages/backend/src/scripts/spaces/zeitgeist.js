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
          votingThreshold: "100000000",
        },
      ],
    },
  ],
  proposeThreshold: "10000000000",
  weightStrategy: [strategies.balanceOf, strategies.quadraticBalanceOf],
  version: "4",
  spaceIcon: "zeitgeist.svg",
  seoImage: "bafybeie36tzyj37hqwaavdibymki5vekejtp3gfmorrxxrwkrmhopo5j6y",
  admins: [],
};

module.exports = {
  zeitgeistConfig: ztgConfig,
};
