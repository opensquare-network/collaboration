const { networks, strategies } = require("./consts");

const stellaSwapConfig = {
  id: "stellaswap",
  name: "StellaSwap",
  symbol: "xStella",
  decimals: 18,
  networks: [
    {
      network: networks.moonbeam,
      assets: [
        {
          type: "erc20",
          contract: "0x06A3b410b681c82417A906993aCeFb91bAB6A080",
          symbol: "xStella",
          decimals: 18,
          votingThreshold: "0",
        },
        {
          type: "stellaswap_staking",
          symbol: "xStella",
          assetName: "xStella (Pool)",
          decimals: 18,
          votingThreshold: "0",
        },
      ],
    },
  ],
  proposeThreshold: "15000000000000000000000",
  weightStrategy: [strategies.balanceOf],
  version: "4",
  spaceIcon: "stellaswap.svg",
  seoImage: "QmSAgQzyZcMVVxgiGehSRQ2S5Amvpu4NG4sLeszJSyPyzA",
};

module.exports = {
  stellaSwapConfig,
};
