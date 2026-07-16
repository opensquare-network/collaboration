require("dotenv").config();

const { getChainTokenCollection } = require("../mongo");

const tokensToRemove = [
  { chain: "karura", symbol: "RMRK" },
  { chain: "karura", symbol: "KINT" },
  { chain: "bifrost", symbol: "RMRK" },
];

async function main() {
  const chainTokenCol = await getChainTokenCollection();

  for (const { chain, symbol } of tokensToRemove) {
    await chainTokenCol.deleteOne({ chain, symbol });
    console.log(
      `Deleted chain token record for chain="${chain}", symbol="${symbol}"`,
    );
  }
}

main()
  .catch(console.error)
  .finally(() => process.exit(0));
