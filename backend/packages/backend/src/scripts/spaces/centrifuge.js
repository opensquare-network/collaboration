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
  version: "3",
  spaceIcon: "centrifuge.svg",
  seoImage: "bafybeidulohutktuxt35n7fjdtshbtzhcdc2idmcynnnaha7t6mdtbzdee",
};

module.exports = {
  centrifugeConfig,
};
