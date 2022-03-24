const dotenv = require("dotenv");
const { chrwnaConfig } = require("./spaces/chrwna");
const { interlayConfig } = require("./spaces/interlay");
dotenv.config();

const { getSpaceCollection } = require("../mongo");
const { kintsugiConfig } = require("./spaces/kintsugi");

const karuraTokenConfig = {
  type: "token",
  network: "karura",
  ss58Format: 8,
};

const bifrostTokenConfig = {
  type: "token",
  network: "bifrost",
  ss58Format: 6,
};

const spaces = [
  {
    id: "polkadot",
    name: "Polkadot",
    symbol: "DOT",
    decimals: 10,
    networks: [
      {
        network: "polkadot",
        ss58Format: 0,
      },
    ],
    proposeThreshold: "10000000000",
    voteThreshold: "100000000",
    weightStrategy: ["balance-of", "quadratic-balance-of"],
    version: "2",
  },
  {
    id: "kusama",
    name: "Kusama",
    symbol: "KSM",
    decimals: 12,
    networks: [
      {
        network: "kusama",
        ss58Format: 2,
      },
      {
        network: "statemine",
        ss58Format: 2,
      },
      karuraTokenConfig,
      bifrostTokenConfig,
    ],
    proposeThreshold: "10000000000",
    voteThreshold: "10000000000",
    weightStrategy: ["balance-of", "quadratic-balance-of"],
    version: "2",
  },
  {
    id: "karura",
    name: "Karura",
    symbol: "KAR",
    decimals: 12,
    networks: [
      {
        network: "karura",
        ss58Format: 8,
      },
    ],
    proposeThreshold: "1000000000000",
    voteThreshold: "10000000000",
    weightStrategy: ["balance-of", "quadratic-balance-of"],
    version: "2",
  },
  {
    id: "khala",
    name: "Khala",
    symbol: "PHA",
    decimals: 12,
    networks: [
      {
        network: "khala",
        ss58Format: 30,
      },
    ],
    proposeThreshold: "10000000000000",
    voteThreshold: "10000000000",
    weightStrategy: ["balance-of", "quadratic-balance-of"],
    version: "2",
  },
  {
    id: "rmrk",
    name: "RMRK",
    symbol: "RMRK",
    decimals: 10,
    networks: [
      {
        type: "asset",
        network: "statemine",
        ss58Format: 2,
        assetId: 8,
      },
      karuraTokenConfig,
      bifrostTokenConfig,
    ],
    proposeThreshold: "500000000000000",
    voteThreshold: "10000000000",
    weightStrategy: ["balance-of", "quadratic-balance-of", "biased-voting"],
    version: "2",
  },
  {
    id: "rmrk-curation",
    name: "RMRK Curation",
    symbol: "RMRK",
    decimals: 10,
    networks: [
      {
        type: "asset",
        network: "statemine",
        ss58Format: 2,
        assetId: 8,
      },
      {
        type: "token",
        network: "karura",
        ss58Format: 8,
      },
      {
        type: "token",
        network: "bifrost",
        ss58Format: 6,
      },
    ],
    proposeThreshold: "4310000000000",
    voteThreshold: "10000000000",
    weightStrategy: ["balance-of", "quadratic-balance-of", "biased-voting"],
    version: "2",
  },
  {
    id: "bifrost",
    name: "Bifrost",
    symbol: "BNC",
    decimals: 12,
    networks: [
      {
        network: "bifrost",
        ss58Format: 6,
      },
    ],
    proposeThreshold: "1000000000000",
    voteThreshold: "10000000000",
    weightStrategy: ["balance-of", "quadratic-balance-of"],
    version: "2",
  },
  kintsugiConfig,
  {
    id: "polarisdao",
    name: "PolarisDAO",
    symbol: "ARIS",
    decimals: 8,
    networks: [
      {
        type: "asset",
        network: "statemine",
        ss58Format: 2,
        assetId: 16,
      },
      karuraTokenConfig,
    ],
    proposeThreshold: "4000000000000",
    voteThreshold: "1000000",
    weightStrategy: ["balance-of", "quadratic-balance-of", "biased-voting"],
  },
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
