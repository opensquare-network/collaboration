const { Accessibility } = require("../../consts/space");
const { networks, strategies } = require("./consts");

const shidenConfig = {
  id: "shiden",
  name: "Shiden",
  symbol: "SDN",
  decimals: 18,
  accessibility: Accessibility.PUBLIC,
  networks: [
    {
      network: networks.shiden,
      ss58Format: 5,
      assets: [
        {
          symbol: "SDN",
          decimals: 18,
          votingThreshold: "1000000000000000000",
        },
      ],
    },
  ],
  proposeThreshold: "500000000000000000000",
  weightStrategy: [strategies.balanceOf, strategies.quadraticBalanceOf],
  version: "4",
  spaceIcon: "shiden.svg",
  seoCoverFilename: "shiden.jpg",
  admins: [],
};

module.exports = {
  shidenConfig,
};
