const { bifrostTokenConfig } = require("./consts");
const { movrErc20CommonConfig } = require("./consts");
const { networks, strategies } = require("./consts");

const karMovrConfig = {
  ...movrErc20CommonConfig,
  contract: "0xFfFFFFfF08220AD2E6e157f26eD8bD22A336A0A5",
};

const config = {
  id: "karura",
  name: "Karura",
  symbol: "VOTE",
  decimals: 12,
  networks: [
    {
      network: networks.karura,
      ss58Format: 8,
      assets: [
        {
          type: "native",
          symbol: "KAR",
          decimals: 12,
        },
        {
          type: "token",
          symbol: "LKSM",
          decimals: 12,
        },
        // {
        //   type: "token",
        //   symbol: "taiKSM",
        //   decimals: 12,
        // },
      ],
    },
    {
      ...karMovrConfig,
      symbol: "KAR",
      decimals: 12,
    },
    {
      ...bifrostTokenConfig,
      symbol: "KAR",
      decimals: 12,
    },
  ],
  proposeThreshold: "1000000000000",
  voteThreshold: "10000000000",
  weightStrategy: [
    strategies.balanceOf,
    strategies.quadraticBalanceOf,
    strategies.biasedVoting,
  ],
  version: "3",
};

module.exports = {
  karuraConfig: config,
};
