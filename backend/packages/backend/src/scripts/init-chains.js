const dotenv = require("dotenv");
dotenv.config();

const { getChainCollection } = require("../mongo");
const { chainsDef } = require("../constants");

async function main() {
  const chainCOl = await getChainCollection();
  const bulk = chainCOl.initializeUnorderedBulkOp();
  for (const chainDef of Object.values(chainsDef)) {
    bulk
      .find({ network: chainDef.network })
      .upsert()
      .update({ $set: chainDef });
  }
  await bulk.execute();
}

main()
  .catch(console.error)
  .then(() => process.exit(0));
