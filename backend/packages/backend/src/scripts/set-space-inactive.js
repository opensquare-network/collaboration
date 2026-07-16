require("dotenv").config();

const { getSpaceCollection } = require("../mongo");

const spaceIds = [
  "interlay",
  "kintsugi",
  "centrifuge",
  "zeitgeist",
  "stafi",
  "stellaswap",
  "crust",
  "basilisk",
  "rmrk",
  "rmrk-curation",
  "crab",
  "turing",
  "rococo",
  "polkadex",
  "khala",
  "phala",
  "moon",
];

async function main() {
  const col = await getSpaceCollection();
  const result = await col.updateMany(
    { id: { $in: spaceIds } },
    { $set: { inactive: true } },
  );
  console.log(`Updated ${result.modifiedCount} spaces to inactive status`);
}

main()
  .catch(console.error)
  .finally(() => process.exit());
