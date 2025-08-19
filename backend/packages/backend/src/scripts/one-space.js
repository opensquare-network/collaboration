const dotenv = require("dotenv");
dotenv.config();

// const { jamDaoConfig } = require("./spaces/jamdao");
// const { truthDaoConfig } = require("./spaces/truthdao");
const { astarConfig } = require("./spaces/astar");
const { getSpaceCollection } = require("../mongo");

(async () => {
  const space = astarConfig;

  const spaceCol = await getSpaceCollection();
  await spaceCol.findOneAndUpdate(
    { id: space.id },
    { $set: space },
    { upsert: true },
  );
  console.log(`Space ${space.name} updated`);
  process.exit(0);
})();
