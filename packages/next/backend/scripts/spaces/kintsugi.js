const { karuraTokenConfig, networks, strategies } = require("./consts");

const config = {
  id: "kintsugi",
  name: "Kintsugi",
  symbol: "KINT",
  decimals: 12,
  networks: [
    {
      network: networks.kintsugi,
      ss58Format: 2092,
    },
    karuraTokenConfig,
  ],
  proposeThreshold: "1000000000000",
  voteThreshold: "10000000000",
  weightStrategy: [
    strategies.balanceOf,
    strategies.quadraticBalanceOf,
    strategies.biasedVoting,
  ],
  version: "2",
};

module.exports = {
  kintsugiConfig: config,
};
