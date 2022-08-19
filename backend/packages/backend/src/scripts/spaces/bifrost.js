const { karuraTokenConfig, movrErc20CommonConfig } = require("./consts");
const { networks, strategies } = require("./consts");

const bncMovrConfig = {
  ...movrErc20CommonConfig,
  contract: "0xfffffffff075423be54811ecb478e911f22dde7d",
};

const bifrostConfig = {
  id: "bifrost",
  name: "Bifrost",
  symbol: "BNC",
  decimals: 12,
  networks: [
    {
      network: networks.bifrost,
      ss58Format: 6,
    },
    karuraTokenConfig,
    bncMovrConfig,
  ],
  proposeThreshold: "1000000000000",
  voteThreshold: "10000000000",
  weightStrategy: [strategies.balanceOf, strategies.quadraticBalanceOf],
  version: "3",
};

module.exports = {
  bifrostConfig,
};
