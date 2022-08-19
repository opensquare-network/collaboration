const { movrErc20CommonConfig } = require("./consts");
const {
  karuraTokenConfig,
  bifrostTokenConfig,
  networks,
  strategies,
} = require("./consts");

const ksmMovrConfig = {
  ...movrErc20CommonConfig,
  contract: "0xFfFFfFff1FcaCBd218EDc0EbA20Fc2308C778080",
};

const config = {
  id: "kusama",
  name: "Kusama",
  symbol: "KSM",
  decimals: 12,
  networks: [
    {
      network: networks.kusama,
      ss58Format: 2,
    },
    {
      network: networks.statemine,
      ss58Format: 2,
    },
    karuraTokenConfig,
    bifrostTokenConfig,
    ksmMovrConfig,
  ],
  proposeThreshold: "10000000000",
  voteThreshold: "10000000000",
  weightStrategy: [strategies.balanceOf, strategies.quadraticBalanceOf],
  version: "3",
};

module.exports = {
  kusamaConfig: config,
};
