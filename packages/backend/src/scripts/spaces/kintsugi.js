const { movrErc20CommonConfig } = require("./consts");
const { karuraTokenConfig, networks, strategies } = require("./consts");

const kintMovrConfig = {
  ...movrErc20CommonConfig,
  contract: "0xfffFFFFF83F4f317d3cbF6EC6250AeC3697b3fF2",
};

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
    kintMovrConfig,
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
