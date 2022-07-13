const dotenv = require("dotenv");
dotenv.config();

// const { polkadexConfig } = require("./spaces/polkadex");
// const { crabConfig } = require("./spaces/crab");
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
const { chrwnaConfig } = require("./spaces/chrwna");
const { interlayConfig } = require("./spaces/interlay");
const { acalaConfig } = require("./spaces/acala");
const { darwiniaConfig } = require("./spaces/darwinia");
// const { centrifugeConfig } = require("./spaces/centrifuge");
const { dotsamaConfig } = require("./spaces/dotsama");

const { getSpaceCollection } = require("../mongo");
const { kintsugiConfig } = require("./spaces/kintsugi");

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
  // crabConfig,
  // centrifugeConfig,
  // dotsamaConfig,
];

async function main() {
  const spaceCol = await getSpaceCollection();
  const bulk = spaceCol.initializeUnorderedBulkOp();
  for (const space of spaces) {
    bulk.find({ id: space.id }).upsert().update({ $set: space });
  }
  await bulk.execute();
}

main()
  .catch(console.error)
  .then(() => process.exit(0));
