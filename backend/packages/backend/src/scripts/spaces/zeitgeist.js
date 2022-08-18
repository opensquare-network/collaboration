const { networks, strategies } = require("./consts");

const ztgConfig = {
  id: "zeitgeist",
  name: "Zeitgeist",
  symbol: "ZTG",
  decimals: 10,
  networks: [
    {
      network: networks.zeitgeist,
      ss58Format: 73,
    },
  ],
  proposeThreshold: "10000000000",
  voteThreshold: "100000000",
  weightStrategy: [strategies.balanceOf, strategies.quadraticBalanceOf],
  version: "2",
};

module.exports = {
  zeitgeistConfig: ztgConfig,
};
