const dotenv = require("dotenv");
dotenv.config();
const { getChainCollection } = require("../mongo");

const chainNetworks = [
  "khala",
  "turing",
  "altair",
  "rococo",
  "parallel",
  "darwinia",
  "litmus",
];

if (!Array.isArray(chainNetworks) || chainNetworks.length === 0) {
  console.log(
    "Please provide at least one chain network in the chainNetworks array.",
  );
  process.exit(1);
}

(async () => {
  const chainCol = await getChainCollection();
  const { deletedCount } = await chainCol.deleteMany({
    network: { $in: chainNetworks },
  });
  if (deletedCount > 0) {
    console.log(
      `Deleted ${deletedCount} chain(s): ${chainNetworks.join(", ")}`,
    );
  } else {
    console.log("Deleted failed");
  }

  process.exit(0);
})();
