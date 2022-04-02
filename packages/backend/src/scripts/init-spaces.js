const dotenv = require("dotenv");

dotenv.config();
const { polarisDaoConfig } = require("./spaces/polarisDao");
const { polkadotConfig } = require("./spaces/polkadot");
const { bifrostConfig } = require("./spaces/bifrost");
const { khalaConfig } = require("./spaces/khala");
const { karuraConfig } = require("./spaces/karura");
const { rmrkConfig, rmrkCurationConfig } = require("./spaces/rmrk");
const { kusamaConfig } = require("./spaces/kusama");
const { chrwnaConfig } = require("./spaces/chrwna");
const { interlayConfig } = require("./spaces/interlay");

const { getSpaceCollection } = require("../mongo");
const { kintsugiConfig } = require("./spaces/kintsugi");

const spaces = [
  polkadotConfig,
  kusamaConfig,
  karuraConfig,
  khalaConfig,
  rmrkConfig,
  rmrkCurationConfig,
  bifrostConfig,
  kintsugiConfig,
  polarisDaoConfig,
  // polkadexConfig,
  chrwnaConfig,
  interlayConfig,
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
