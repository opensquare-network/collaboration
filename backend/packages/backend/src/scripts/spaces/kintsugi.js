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
  version: "3",
  spaceIcon: "kintsugi.svg",
  seoImage: "bafybeif53hdkhwqijaxw6kgal6mywu3hel6wlpma2lge4nee2xqmxgq2fa",
};

module.exports = {
  kintsugiConfig: config,
};
