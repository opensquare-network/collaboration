const { networks, strategies } = require("./consts");

const phalaConfig = {
  id: "phala",
  name: "Phala",
  symbol: "PHA",
  decimals: 12,
  networks: [
    {
      network: networks.phala,
      ss58Format: 30,
      assets: [
        {
          symbol: "PHA",
          decimals: 12,
          votingThreshold: "10000000000",
        },
      ],
    },
    {
      network: networks.khala,
      ss58Format: 30,
      assets: [
        {
          symbol: "PHA",
          decimals: 12,
          votingThreshold: "10000000000",
        },
      ],
    },
    {
      network: networks.ethereum,
      assets: [
        {
          type: "erc20",
          symbol: "PHA",
          contract: "0x6c5bA91642F10282b576d91922Ae6448C9d52f4E",
          decimals: 18,
          votingThreshold: "10000000000000000",
        },
      ],
    },
  ],
  proposeThreshold: "10000000000000",
  weightStrategy: [strategies.balanceOf, strategies.quadraticBalanceOf],
  version: "4",
  spaceIcon: "phala.svg",
  seoImage: "bafybeifj4smmnnn5t25quydmujkphoxymyylfbaxoaymszeovsejqyep5y",
  admins: [],
};

module.exports = {
  phalaConfig,
};
