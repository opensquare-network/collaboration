const { Accessibility } = require("../../consts/space");
const { networks, strategies } = require("./consts");

const config = {
  id: "kusamasociety",
  name: "KusamaSociety",
  symbol: "KSM",
  decimals: 12,
  accessibility: Accessibility.SOCIETY,
  networks: [
    {
      network: networks.kusama,
      ss58Format: 2,
      assets: [
        {
          symbol: "KSM",
          decimals: 12,
        },
      ],
    },
  ],
  weightStrategy: [strategies.society],
  version: "4",
  spaceIcon: "kusamasociety.png",
  seoImage: "QmYB3YVU3Sa27EfqTk3cGZ9S3GhiH6Z2ANpQdHKETpRrEZ",
  admins: [],
};

module.exports = {
  kusamaSocietyConfig: config,
};
