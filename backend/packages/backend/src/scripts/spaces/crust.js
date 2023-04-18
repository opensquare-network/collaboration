const { strategies } = require("../../consts/voting");
const { networks } = require("../../consts/networks");

const config = {
  id: "crust",
  name: "Crust",
  symbol: "CRU",
  decimals: 12,
  networks: [
    {
      network: networks.crust,
      ss58Format: 66,
      assets: [
        {
          symbol: "CRU",
          decimals: 12,
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
        },
      ],
    },
  ],
  proposeThreshold: "1000000000000",
  voteThreshold: "1000000000000",
  weightStrategy: [strategies.balanceOf, strategies.quadraticBalanceOf],
  version: "3",
  spaceIcon: "crust.svg",
  seoImage: "bafybeiembasna4ccja4qnod6xyrg6a67bvx7djn3zz4tdiajbav6ge3tle",
};

module.exports = {
  crustConfig: config,
};
