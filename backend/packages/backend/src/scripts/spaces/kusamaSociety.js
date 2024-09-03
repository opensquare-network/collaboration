const { networks, strategies } = require("./consts");

const config = {
  id: "kusamasociety",
  name: "KusamaSociety",
  symbol: "KSM",
  decimals: 12,
  networks: [
    {
      network: networks.kusama,
      ss58Format: 2,
      whoCanVote: "societyMember",
      assets: [
        {
          symbol: "KSM",
          decimals: 12,
          votingThreshold: "10000000000",
        },
      ],
    },
  ],
  proposeThreshold: "10000000000",
  weightStrategy: [strategies.onePersonOneVote],
  version: "4",
  spaceIcon: "kusamasociety.png",
  seoImage: "QmYB3YVU3Sa27EfqTk3cGZ9S3GhiH6Z2ANpQdHKETpRrEZ",
  admins: [],
};

module.exports = {
  kusamaSocietyConfig: config,
};
