const dotenv = require("dotenv");
dotenv.config();

const { jamDaoConfig } = require("./spaces/jamdao");
const { getSpaceCollection } = require("../mongo");

(async () => {
  const spaceCol = await getSpaceCollection();
  await spaceCol.findOneAndUpdate(
    { id: jamDaoConfig.id },
    { $set: jamDaoConfig },
    { upsert: true },
  );
  console.log(`Space ${jamDaoConfig.name} updated`);
  process.exit(0);
})();
