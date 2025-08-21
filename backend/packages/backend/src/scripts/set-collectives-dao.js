require("dotenv").config();

const { SpaceType } = require("../consts/space");
const { getSpaceCollection } = require("../mongo");

const allSpaceIds = ["permanence", "truthdao", "jamdao"];

async function main() {
  const col = await getSpaceCollection();
  const items = await col.find({ id: { $in: allSpaceIds } }).toArray();
  for (const item of items) {
    await col.updateOne(
      { id: item.id },
      {
        $set: {
          type: SpaceType.CollectivesDao,
          members: item.members || item.whitelist,
        },
        $unset: { whitelist: "" },
      },
    );
  }
}

main()
  .catch(console.error)
  .finally(() => process.exit());
