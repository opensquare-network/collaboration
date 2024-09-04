const { Accessibility } = require("../../consts/space");
const { networks, strategies } = require("./consts");

const hydradxConfig = {
  id: "hydradx",
  name: "HydraDX",
  symbol: "HDX",
  decimals: 12,
  accessibility: Accessibility.PUBLIC,
  networks: [
    {
      network: networks.hydradx,
      ss58Format: 63,
      assets: [
        {
          symbol: "HDX",
          decimals: 12,
          votingThreshold: "10000000000",
        },
      ],
    },
  ],
  proposeThreshold: "1000000000000",
  weightStrategy: [strategies.balanceOf, strategies.quadraticBalanceOf],
  version: "4",
  spaceIcon: "hydradx.svg",
  seoImage: "bafybeibbo36wx4t7y5hpj6dutnkxwo7rigk7vwivcblonb2aws7keervme",
  admins: [],
};

module.exports = {
  hydradxConfig,
};
