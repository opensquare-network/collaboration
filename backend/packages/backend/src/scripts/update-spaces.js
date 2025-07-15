const dotenv = require("dotenv");
dotenv.config();

const omit = require("lodash.omit");
const spaces = require("./spaces");
const { getSpaceCollection } = require("../mongo");

async function main() {
  const spaceCol = await getSpaceCollection();
  const bulk = spaceCol.initializeUnorderedBulkOp();
  for (const space of spaces) {
    // Omit members and admins from the space data to avoid overwriting them
    // Because these fields could be modified by API
    const spaceData = omit(space, ["members", "admins"]);
    bulk.find({ id: space.id }).upsert().update({ $set: spaceData });
  }
  await bulk.execute();
}

main()
  .catch(console.error)
  .then(() => process.exit(0));
