const { strategies } = require("../../consts/voting");
const { networks } = require("../../consts/networks");
const { Accessibility } = require("../../consts/space");

const config = {
  id: "darwinia",
  name: "Darwinia",
  symbol: "RING",
  decimals: 9,
  accessibility: Accessibility.PUBLIC,
  networks: [
    {
      network: networks.darwinia,
      ss58Format: 18,
      assets: [
        {
          symbol: "RING",
          decimals: 9,
          votingThreshold: "1000000000",
        },
      ],
    },
    {
      network: networks.ethereum,
      assets: [
        {
          type: "erc20",
          contract: "0x9469D013805bFfB7D3DEBe5E7839237e535ec483",
          symbol: "RING",
          decimals: 18,
          votingThreshold: "1000000000000000000",
        },
      ],
    },
  ],
  proposeThreshold: "10000000000",
  weightStrategy: [strategies.balanceOf, strategies.quadraticBalanceOf],
  version: "4",
  spaceIcon: "darwinia.svg",
  seoCoverFilename: "darwinia.jpg",
  admins: [],
};

module.exports = {
  darwiniaConfig: config,
};
