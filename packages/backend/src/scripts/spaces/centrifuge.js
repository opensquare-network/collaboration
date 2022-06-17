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
    },
  ],
  proposeThreshold: "1000000000000000000",
  voteThreshold: "1000000000000000000",
  weightStrategy: [strategies.balanceOf, strategies.quadraticBalanceOf],
  version: "2",
};

module.exports = {
  centrifugeConfig,
};
