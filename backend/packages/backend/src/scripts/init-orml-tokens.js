const dotenv = require("dotenv");
dotenv.config();

const { getOrmlTokenCollection } = require("../mongo");

const karuraOrmlTokens = [
  { symbol: "RMRK", decimals: 10 },
  { symbol: "KSM", decimals: 12 },
  { symbol: "ARIS", decimals: 8 },
  { symbol: "KINT", decimals: 12 },
  { symbol: "BNC", decimals: 12 },
  { symbol: "LKSM", decimals: 12 },
  { symbol: "taiKSM", decimals: 12 },
];

const bifrostOrmlTokens = [
  { symbol: "RMRK", decimals: 10 },
  { symbol: "KSM", decimals: 12 },
  { symbol: "KAR", decimals: 12 },
];

const ormlTokens = {
  karura: karuraOrmlTokens,
  bifrost: bifrostOrmlTokens,
};

async function main() {
  const ormlTokenCol = await getOrmlTokenCollection();
  const bulk = ormlTokenCol.initializeUnorderedBulkOp();
  for (const chain in ormlTokens) {
    const tokens = ormlTokens[chain];
    for (const { symbol, decimals } of tokens) {
      bulk
        .find({ chain, symbol })
        .upsert()
        .update({ $set: { chain, symbol, decimals } });
    }
  }
  await bulk.execute();
}

main()
  .catch(console.error)
  .then(() => process.exit(0));
