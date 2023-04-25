const { networks, strategies } = require("./consts");

const config = {
  id: "kintsugi",
  name: "Kintsugi",
  symbol: "KINT",
  decimals: 12,
  networks: [
    {
      network: networks.kintsugi,
      ss58Format: 2092,
      assets: [
        {
          symbol: "KINT",
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
          symbol: "KINT",
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
          contract: "0xfffFFFFF83F4f317d3cbF6EC6250AeC3697b3fF2",
          symbol: "KINT",
          decimals: 12,
          votingThreshold: "10000000000",
        },
      ],
    },
  ],
  proposeThreshold: "1000000000000",
  weightStrategy: [
    strategies.balanceOf,
    strategies.quadraticBalanceOf,
    strategies.biasedVoting,
  ],
  version: "4",
  spaceIcon: "kintsugi.svg",
  seoImage: "bafybeif53hdkhwqijaxw6kgal6mywu3hel6wlpma2lge4nee2xqmxgq2fa",
};

module.exports = {
  kintsugiConfig: config,
};
