const { strategies } = require("../../consts/voting");
const { networks } = require("../../consts/networks");

const karuraTokenConfig = {
  network: networks.karura,
  ss58Format: 8,
};

const bifrostTokenConfig = {
  network: networks.bifrost,
  ss58Format: 0,
};

const statemineCommonConfig = {
  network: networks.statemine,
  ss58Format: 2,
};

const statemintCommonConfig = {
  network: networks.statemint,
  ss58Format: 0,
};

const movrErc20CommonConfig = {
  network: networks.moonriver,
};

const ethErc20CommonConfig = {
  network: networks.ethereum,
};

module.exports = {
  karuraTokenConfig,
  bifrostTokenConfig,
  statemineCommonConfig,
  statemintCommonConfig,
  networks,
  strategies,
  movrErc20CommonConfig,
  ethErc20CommonConfig,
};
