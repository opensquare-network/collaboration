const { zeitgeistConfig } = require("./zeitgeist");
const { turingConfig } = require("./turing");
const { crustConfig } = require("./crust");
const { polarisDaoConfig } = require("./polarisDao");
const { polkadotConfig } = require("./polkadot");
const { bifrostConfig } = require("./bifrost");
const { phalaConfig } = require("./phala");
const { karuraConfig } = require("./karura");
const { rmrkConfig, rmrkCurationConfig } = require("./rmrk");
const { kusamaConfig } = require("./kusama");
const { kusamaSocietyConfig } = require("./kusamaSociety");
const { chrwnaConfig } = require("./chrwna");
const { interlayConfig } = require("./interlay");
const { acalaConfig } = require("./acala");
const { centrifugeConfig } = require("./centrifuge");
const { dotsamaConfig } = require("./dotsama");
const { shidenConfig } = require("./shiden");
const { kintsugiConfig } = require("./kintsugi");
const { basiliskConfig } = require("./basilisk");
const { hydradxConfig, hydrationConfig } = require("./hydradx");
const { stellaSwapConfig } = require("./stellaswap");
const { stafiConfig } = require("./stafi");
const { creditcoinConfig } = require("./creditcoin");
const { creditcoinEnterpriseConfig } = require("./creditcoinEnterprise");
const { permanenceConfig } = require("./permanence");
const { jamDaoConfig } = require("./jamdao");
const { truthDaoConfig } = require("./truthdao");
const { rococoConfig } = require("./rococo");

const spaces = [
  polkadotConfig,
  kusamaConfig,
  karuraConfig,
  phalaConfig,
  rmrkConfig,
  rmrkCurationConfig,
  bifrostConfig,
  kintsugiConfig,
  polarisDaoConfig,
  chrwnaConfig,
  interlayConfig,
  acalaConfig,
  crustConfig,
  turingConfig,
  zeitgeistConfig,
  shidenConfig,
  dotsamaConfig,
  kusamaSocietyConfig,
  centrifugeConfig,
  basiliskConfig,
  hydradxConfig,
  hydrationConfig,
  stellaSwapConfig,
  stafiConfig,
  creditcoinConfig,
  creditcoinEnterpriseConfig,
];

const daoSpaces = [permanenceConfig, jamDaoConfig, truthDaoConfig];

if (["1", "true", "TRUE"].includes(process.env.DEVELOPMENT)) {
  spaces.push(rococoConfig);
}

module.exports = {
  spaces,
  daoSpaces,
};
