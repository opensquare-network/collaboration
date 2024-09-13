const { strategies } = require("../../consts/voting");
const { networks } = require("../../consts/networks");
const { Accessibility } = require("../../consts/space");

const config = {
  id: "crust",
  name: "Crust",
  symbol: "CRU",
  decimals: 12,
  accessibility: Accessibility.PUBLIC,
  networks: [
    {
      network: networks.crust,
      ss58Format: 66,
      assets: [
        {
          symbol: "CRU",
          decimals: 12,
          votingThreshold: "1000000000000",
        },
      ],
    },
    {
      network: networks.ethereum,
      assets: [
        {
          type: "erc20",
          contract: "0x32a7C02e79c4ea1008dD6564b35F131428673c41",
          symbol: "CRU",
          decimals: 18,
          votingThreshold: "1000000000000000000",
        },
      ],
    },
  ],
  proposeThreshold: "1000000000000",
  weightStrategy: [strategies.balanceOf, strategies.quadraticBalanceOf],
  version: "4",
  spaceIcon: "crust.svg",
  seoCoverFilename: "crust.jpg",
  admins: [],
};

module.exports = {
  crustConfig: config,
};
