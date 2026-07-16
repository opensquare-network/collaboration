require("dotenv").config();

const { bifrostConfig } = require("./spaces/bifrost");
const { karuraConfig } = require("./spaces/karura");
const { kusamaConfig } = require("./spaces/kusama");
const { getSpaceCollection } = require("../mongo");

const spacesToUpdate = [bifrostConfig, karuraConfig, kusamaConfig];

async function main() {
  const spaceCol = await getSpaceCollection();

  for (const space of spacesToUpdate) {
    await spaceCol.updateOne(
      { id: space.id },
      { $set: { networks: space.networks } },
      { upsert: true },
    );
    console.log(`Space "${space.id}" updated.`);
  }
}

main()
  .catch(console.error)
  .finally(() => {
    process.exit();
  });
