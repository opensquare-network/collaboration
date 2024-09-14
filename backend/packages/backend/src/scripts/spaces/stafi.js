const { strategies } = require("../../consts/voting");
const { networks } = require("../../consts/networks");
const { Accessibility } = require("../../consts/space");

const config = {
  id: "stafi",
  name: "StaFi",
  symbol: "VOTE",
  decimals: 18,
  accessibility: Accessibility.PUBLIC,
  networks: [
    {
      network: networks.stafi,
      ss58Format: 20,
      assets: [
        {
          symbol: "FIS",
          decimals: 12,
          multiplier: 10,
          votingThreshold: "1000000000000",
        },
        {
          type: "token",
          symbol: "rFIS",
          decimals: 12,
          multiplier: 17,
          votingThreshold: "1000000000000",
        },
      ],
    },
    {
      network: networks.ethereum,
      assets: [
        {
          type: "erc20",
          contract: "0xef3a930e1ffffacd2fc13434ac81bd278b0ecc8d",
          symbol: "FIS",
          decimals: 18,
          multiplier: 10,
          votingThreshold: "1000000000000000000",
        },
        {
          type: "erc20",
          contract: "0xc82eb6dea0c93edb8b697b89ad1b13d19469d635",
          symbol: "rFIS",
          decimals: 18,
          multiplier: 17,
          votingThreshold: "1000000000000000000",
        },
      ],
    },
  ],
  proposeThreshold: "100000000000000000000000",
  weightStrategy: [strategies.quorumQuadraticBalanceOf],
  quorum: "400000000000000000000000",
  version: "4",
  spaceIcon: "stafi.png",
  seoCoverFilename: "stafi.jpg",
  admins: [],
};

module.exports = {
  stafiConfig: config,
};
