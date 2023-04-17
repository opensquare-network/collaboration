const { networks, strategies } = require("./consts");

const config = {
  id: "kusama",
  name: "Kusama",
  symbol: "KSM",
  decimals: 12,
  networks: [
    {
      network: networks.kusama,
      ss58Format: 2,
      assets: [
        {
          symbol: "KSM",
          decimals: 12,
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
        },
      ],
    },
    {
      network: networks.bifrost,
      ss58Format: 6,
      assets: [
        {
          type: "token",
          symbol: "KSM",
          decimals: 12,
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
        },
      ],
    },
  ],
  proposeThreshold: "10000000000",
  voteThreshold: "10000000000",
  weightStrategy: [strategies.balanceOf, strategies.quadraticBalanceOf],
  version: "3",
};

module.exports = {
  kusamaConfig: config,
};
