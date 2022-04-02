const { strategies } = require("../../consts/voting");
const { networks } = require("../../consts/networks");

const karuraTokenConfig = {
  type: "token",
  network: networks.karura,
  ss58Format: 8,
};

const bifrostTokenConfig = {
  type: "token",
  network: networks.bifrost,
  ss58Format: 6,
};

const statemineCommonConfig = {
  type: "asset",
  network: networks.statemine,
  ss58Format: 2,
};

const movrErc20CommonConfig = {
  type: "erc20",
  network: networks.moonriver,
};

module.exports = {
  karuraTokenConfig,
  bifrostTokenConfig,
  statemineCommonConfig,
  networks,
  strategies,
  movrErc20CommonConfig,
};
