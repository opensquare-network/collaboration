require("dotenv").config();

const { getSpaceCollection } = require("../mongo");

const spaceId = "the-sax-guild";

async function main() {
  const col = await getSpaceCollection();
  await col.updateOne(
    { id: spaceId },
    { $set: { allowAnonymousProposal: true } },
  );
}

main()
  .catch(console.error)
  .finally(() => process.exit());
