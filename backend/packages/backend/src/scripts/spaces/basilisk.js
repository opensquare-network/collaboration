const { networks, strategies } = require("./consts");

const basiliskConfig = {
  id: "basilisk",
  name: "Basilisk",
  symbol: "BSX",
  decimals: 12,
  networks: [
    {
      network: networks.basilisk,
      ss58Format: 10041,
    },
  ],
  proposeThreshold: "1000000000000",
  voteThreshold: "10000000000",
  weightStrategy: [strategies.balanceOf, strategies.quadraticBalanceOf],
  version: "3",
  spaceIcon: "basilisk.svg",
  seoImage: "bafybeihuz5wbvovfq7a4xzii4ynytvwq6cwhbzaprqye6bsc26hnlia6tu",
};

module.exports = {
  basiliskConfig,
};
