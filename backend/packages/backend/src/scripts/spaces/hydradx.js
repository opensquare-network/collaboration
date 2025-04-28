const { Accessibility } = require("../../consts/space");
const { networks, strategies } = require("./consts");

const hydradxNetwork = {
  network: networks.hydradx,
  ss58Format: 63,
  assets: [
    {
      symbol: "HDX",
      decimals: 12,
      votingThreshold: "10000000000",
    },
  ],
};

const publicConfig = {
  symbol: "HDX",
  decimals: 12,
  accessibility: Accessibility.PUBLIC,
  proposeThreshold: "1000000000000",
  weightStrategy: [strategies.balanceOf, strategies.quadraticBalanceOf],
  version: "4",
  admins: [],
};

const hydradxConfig = {
  ...publicConfig,
  id: "hydradx",
  name: "HydraDX",
  spaceIcon: "hydradx.svg",
  seoCoverFilename: "hydration.jpg",
  networks: [hydradxNetwork],
  offline: true,
};

const hydrationConfig = {
  ...publicConfig,
  id: "hydration",
  name: "Hydration",
  networks: [
    {
      ...hydradxNetwork,
      network: networks.hydration,
    },
  ],
  spaceIcon: "hydration.svg",
  seoCoverFilename: "hydration.jpg",
};

module.exports = {
  hydradxConfig,
  hydrationConfig,
};
