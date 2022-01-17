const dotenv = require("dotenv");
dotenv.config();

const { getSpaceCollection } = require("../mongo");

const spaces = [
  {
    id: "polkadot",
    name: "Polkadot",
    network: "polkadot",
    symbol: "DOT",
    ss58Format: 0,
    decimals: 10,
    proposeThreshold: "10000000000",
    voteThreshold: "100000000",
    weightStrategy: ["balance-of","quadratic-balance-of"],
  },
  {
    id: "kusama",
    name: "Kusama",
    network: "kusama",
    symbol: "KSM",
    ss58Format: 2,
    decimals: 12,
    proposeThreshold: "10000000000",
    voteThreshold: "10000000000",
    weightStrategy: ["balance-of","quadratic-balance-of"],
  },
  {
    id: "karura",
    name: "Karura",
    network: "karura",
    symbol: "KAR",
    ss58Format: 8,
    decimals: 12,
    proposeThreshold: "1000000000000",
    voteThreshold: "10000000000",
    weightStrategy: ["balance-of","quadratic-balance-of"],
    identity: "kusama",
  },
  {
    id: "khala",
    name: "Khala",
    network: "khala",
    symbol: "PHA",
    ss58Format: 30,
    decimals: 12,
    proposeThreshold: "10000000000000",
    voteThreshold: "10000000000",
    weightStrategy: ["balance-of","quadratic-balance-of"],
  },
  {
    id: "rmrk",
    name: "RMRK",
    network: "statemine",
    assetId: 8,
    symbol: "RMRK",
    ss58Format: 2,
    decimals: 10,
    proposeThreshold: "500000000000000",
    voteThreshold: "10000000000",
    weightStrategy: ["balance-of","quadratic-balance-of"],
    identity: "kusama",
  },
  {
    id: "rmrk-curation",
    name: "RMRK Curation",
    network: "statemine",
    assetId: 8,
    symbol: "RMRK",
    ss58Format: 2,
    decimals: 10,
    proposeThreshold: "4310000000000",
    voteThreshold: "10000000000",
    weightStrategy: ["balance-of","quadratic-balance-of"],
    identity: "kusama",
  },
];

async function main() {
  const spaceCol = await getSpaceCollection();
  const bulk = spaceCol.initializeUnorderedBulkOp();
  for (const space of spaces) {
    bulk
      .find({ id: space.id })
      .upsert()
      .update({ $set: space });
  }
  await bulk.execute();
}

main()
  .catch(console.error)
  .then(() => process.exit(0));
