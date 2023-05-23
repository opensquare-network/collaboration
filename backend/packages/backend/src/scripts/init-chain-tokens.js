const dotenv = require("dotenv");
dotenv.config();

const { getChainTokenCollection } = require("../mongo");

const TokenType = {
  ORML: "orml",
};

const karuraTokens = [
  { symbol: "RMRK", decimals: 10, type: TokenType.ORML },
  { symbol: "KSM", decimals: 12, type: TokenType.ORML },
  { symbol: "ARIS", decimals: 8, type: TokenType.ORML },
  { symbol: "KINT", decimals: 12, type: TokenType.ORML },
  { symbol: "BNC", decimals: 12, type: TokenType.ORML },
  { symbol: "LKSM", decimals: 12, type: TokenType.ORML },
  { symbol: "taiKSM", decimals: 12, type: TokenType.ORML },
];

const bifrostTokens = [
  { symbol: "RMRK", decimals: 10, type: TokenType.ORML },
  { symbol: "KSM", decimals: 12, type: TokenType.ORML },
  { symbol: "KAR", decimals: 12, type: TokenType.ORML },
];

const chainTokens = {
  karura: karuraTokens,
  bifrost: bifrostTokens,
};

async function main() {
  const chainTokenCol = await getChainTokenCollection();
  const bulk = chainTokenCol.initializeUnorderedBulkOp();
  for (const [chain, tokens] of Object.entries(chainTokens)) {
    for (const { symbol, decimals, type } of tokens) {
      bulk
        .find({ chain, symbol })
        .upsert()
        .update({ $set: { chain, symbol, decimals, type } });
    }
  }
  await bulk.execute();
}

main()
  .catch(console.error)
  .then(() => process.exit(0));
