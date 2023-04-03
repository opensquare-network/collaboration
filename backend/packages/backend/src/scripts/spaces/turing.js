const { networks, strategies } = require("./consts");
const turingConfig = {
  id: "turing",
  name: "Turing",
  symbol: "TUR",
  decimals: 10,
  networks: [
    {
      network: networks.turing,
      ss58Format: 51,
    },
  ],
  proposeThreshold: "10000000000",
  voteThreshold: "10000000000",
  weightStrategy: [strategies.balanceOf, strategies.quadraticBalanceOf],
  version: "3",
  spaceIcon: "turing.svg",
  seoImage: "bafybeihacd32q2yzqgtfiryts5ih2zlqki2b2jmmaoj4qosx63atvo4g3a",
};

module.exports = {
  turingConfig,
};
