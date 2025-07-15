const dotenv = require("dotenv");
dotenv.config();

const { spaces, daoSpaces } = require("./spaces");
const { getSpaceCollection } = require("../mongo");

async function main() {
  const spaceCol = await getSpaceCollection();
  const bulk = spaceCol.initializeUnorderedBulkOp();
  for (const space of [...spaces, ...daoSpaces]) {
    const spaceData = {
      offline: false, // set default offline space
      ...space,
    };
    bulk.find({ id: space.id }).upsert().update({ $set: spaceData });
  }
  await bulk.execute();
}

main()
  .catch(console.error)
  .then(() => process.exit(0));
