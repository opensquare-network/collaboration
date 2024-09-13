const { Accessibility } = require("../../consts/space");
const { networks, strategies } = require("./consts");

const ztgConfig = {
  id: "zeitgeist",
  name: "Zeitgeist",
  symbol: "ZTG",
  decimals: 10,
  accessibility: Accessibility.PUBLIC,
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
  seoCoverFilename: "zeitgeist.jpg",
  admins: [],
};

module.exports = {
  zeitgeistConfig: ztgConfig,
};
