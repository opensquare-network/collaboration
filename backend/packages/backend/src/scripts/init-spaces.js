const dotenv = require("dotenv");
dotenv.config();

// const { polkadexConfig } = require("./spaces/polkadex");
// const { crabConfig } = require("./spaces/crab");
const { zeitgeistConfig } = require("./spaces/zeitgeist");
const { turingConfig } = require("./spaces/turing");
const { crustConfig } = require("./spaces/crust");
const { polarisDaoConfig } = require("./spaces/polarisDao");
const { polkadotConfig } = require("./spaces/polkadot");
const { bifrostConfig } = require("./spaces/bifrost");
// const { khalaConfig } = require("./spaces/khala");
const { phalaConfig } = require("./spaces/phala");
const { karuraConfig } = require("./spaces/karura");
const { rmrkConfig, rmrkCurationConfig } = require("./spaces/rmrk");
const { kusamaConfig } = require("./spaces/kusama");
const { kusamaSocietyConfig } = require("./spaces/kusamaSociety");
const { chrwnaConfig } = require("./spaces/chrwna");
const { interlayConfig } = require("./spaces/interlay");
const { acalaConfig } = require("./spaces/acala");
const { darwiniaConfig } = require("./spaces/darwinia");
const { centrifugeConfig } = require("./spaces/centrifuge");
const { dotsamaConfig } = require("./spaces/dotsama");
const { shidenConfig } = require("./spaces/shiden");
const { altairConfig } = require("./spaces/altair");

const { getSpaceCollection } = require("../mongo");
const { kintsugiConfig } = require("./spaces/kintsugi");
const { litentryConfig } = require("./spaces/litentry");
const { lksmConfig } = require("./spaces/lksm");
const { parallelConfig } = require("./spaces/parallel");
const { basiliskConfig } = require("./spaces/basilisk");
const { hydradxConfig, hydrationConfig } = require("./spaces/hydradx");
const { rococoConfig } = require("./spaces/rococo");
const { stellaSwapConfig } = require("./spaces/stellaswap");
const { stafiConfig } = require("./spaces/stafi");
const { creditcoinConfig } = require("./spaces/creditcoin");
const { creditcoinEnterpriseConfig } = require("./spaces/creditcoinEnterprise");
const { dotaConfig } = require("./spaces/dota");
const { permanenceConfig } = require("./spaces/permanence");
const { jamDaoConfig } = require("./spaces/jamdao");
const { truthDaoConfig } = require("./spaces/truthdao");

const spaces = [
  polkadotConfig,
  kusamaConfig,
  karuraConfig,
  phalaConfig,
  // khalaConfig,
  rmrkConfig,
  rmrkCurationConfig,
  bifrostConfig,
  kintsugiConfig,
  polarisDaoConfig,
  // polkadexConfig,
  chrwnaConfig,
  interlayConfig,
  acalaConfig,
  crustConfig,
  darwiniaConfig,
  turingConfig,
  litentryConfig,
  zeitgeistConfig,
  shidenConfig,
  // crabConfig,
  dotsamaConfig,
  kusamaSocietyConfig,
  lksmConfig,
  centrifugeConfig,
  altairConfig,
  parallelConfig,
  basiliskConfig,
  hydradxConfig,
  hydrationConfig,
  stellaSwapConfig,
  stafiConfig,
  creditcoinConfig,
  creditcoinEnterpriseConfig,
  dotaConfig,
  permanenceConfig,
  jamDaoConfig,
  truthDaoConfig,
];

if (["1", "true", "TRUE"].includes(process.env.DEVELOPMENT)) {
  spaces.push(rococoConfig);
}

async function main() {
  const spaceCol = await getSpaceCollection();
  const bulk = spaceCol.initializeUnorderedBulkOp();
  for (const space of spaces) {
    const spaceData = {
      offline: false, // set default offline space
      ...space,
    };
    bulk.find({ id: space.id }).upsert().update({ $set: spaceData });
  }
  await bulk.execute();
}

main()
  .catch(console.error)
  .then(() => process.exit(0));
