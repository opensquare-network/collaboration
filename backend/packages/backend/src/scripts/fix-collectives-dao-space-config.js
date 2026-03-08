require("dotenv").config();

const { daoSpaces } = require("./spaces");
const { getSpaceCollection } = require("../mongo");

async function main() {
  const col = await getSpaceCollection();
  for (const item of daoSpaces) {
    await col.updateOne(
      { id: item.id },
      {
        $set: item,
        $unset: {
          whitelist: "",
          symbol: "",
          decimals: "",
          networks: "",
        },
      },
    );
  }
}

main()
  .catch(console.error)
  .finally(() => process.exit());
