const { Accessibility } = require("../../consts/space");
const { networks, strategies } = require("./consts");

const centrifugeConfig = {
  id: networks.centrifuge,
  name: "Centrifuge",
  symbol: "CFG",
  decimals: 18,
  accessibility: Accessibility.PUBLIC,
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
          votingThreshold: "1000000000000000000",
        },
      ],
    },
  ],
  proposeThreshold: "1000000000000000000",
  weightStrategy: [strategies.quorumBalanceOf],
  quorum: "4000000000000000000000000",
  version: "4",
  spaceIcon: "centrifuge.svg",
  seoCoverFilename: "centrifuge.jpg",
  admins: [],
};

module.exports = {
  centrifugeConfig,
};
