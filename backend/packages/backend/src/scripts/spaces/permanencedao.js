const { Accessibility } = require("../../consts/space");
const { networks, strategies } = require("./consts");

const config = {
  id: "permanencedao",
  name: "PermanenceDAO",
  symbol: "DOT",
  decimals: 10,
  accessibility: Accessibility.WHITELIST,
  whitelist: [
    // list addresses here to give them access to the space
  ],
  networks: [
    {
      network: networks.polkadot,
      ss58Format: 0,
      assets: [
        {
          symbol: "DOT",
          decimals: 10,
        },
      ],
    },
  ],
  weightStrategy: [strategies.onePersonOneVote],
  version: "4",
  spaceIcon: "permanencedao.svg",
  seoCoverFilename: "permanence_dao.jpg",
  admins: [],
};

module.exports = {
  permanenceDaoConfig: config,
};
