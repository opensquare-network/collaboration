const { Accessibility } = require("../../consts/space");
const { networks, strategies } = require("./consts");

const config = {
  id: "kusama",
  name: "Kusama",
  symbol: "KSM",
  decimals: 12,
  accessibility: Accessibility.PUBLIC,
  networks: [
    {
      network: networks.kusama,
      ss58Format: 2,
      assets: [
        {
          symbol: "KSM",
          decimals: 12,
          votingThreshold: "10000000000",
        },
      ],
    },
    {
      network: networks.statemine,
      ss58Format: 2,
      assets: [
        {
          symbol: "KSM",
          decimals: 12,
          votingThreshold: "10000000000",
        },
      ],
    },
    {
      network: networks.karura,
      ss58Format: 8,
      assets: [
        {
          type: "token",
          symbol: "KSM",
          decimals: 12,
          votingThreshold: "10000000000",
        },
      ],
    },
    {
      network: networks.bifrost,
      ss58Format: 0,
      assets: [
        {
          type: "token",
          symbol: "KSM",
          decimals: 12,
          votingThreshold: "10000000000",
        },
      ],
    },
    {
      network: networks.moonriver,
      assets: [
        {
          type: "erc20",
          contract: "0xFfFFfFff1FcaCBd218EDc0EbA20Fc2308C778080",
          symbol: "KSM",
          decimals: 12,
          votingThreshold: "10000000000",
        },
      ],
    },
  ],
  proposeThreshold: "10000000000",
  weightStrategy: [strategies.balanceOf, strategies.quadraticBalanceOf],
  version: "4",
  spaceIcon: "kusama.svg",
  seoCoverFilename: "kusama.jpg",
  admins: [],
};

module.exports = {
  kusamaConfig: config,
};
