const { Accessibility } = require("../../consts/space");
const { networks, strategies } = require("./consts");

const config = {
  id: "permanencedao",
  name: "PermanenceDAO",
  symbol: "DOT",
  decimals: 10,
  accessibility: Accessibility.WHITELIST,
  whitelist: ["5DctGWV3aRtMiapszBwAE4GR9AYEzGM4Gkn5gqyU5nU7R9uk"],
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
  spaceIcon: "permanencedao.png",
  seoCoverFilename: "permanencedao.jpg",
  admins: [],
};

module.exports = {
  permanenceDaoConfig: config,
};
