const { networks, strategies } = require("./consts");

const centrifugeConfig = {
  id: networks.centrifuge,
  name: "Centrifuge",
  symbol: "CFG",
  decimals: 18,
  networks: [
    {
      network: networks.centrifuge,
      ss58Format: 36,
      assets: [
        {
          symbol: "CFG",
          decimals: 18,
          delegation: "democracy",
          isNative: true,
        },
      ],
    },
  ],
  proposeThreshold: "1000000000000000000",
  voteThreshold: "1000000000000000000",
  weightStrategy: [strategies.balanceOf],
  version: "3",
};

module.exports = {
  centrifugeConfig,
};
