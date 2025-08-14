require("dotenv").config();

const omit = require("lodash.omit");
const minimist = require("minimist");
const { spaces } = require("./spaces");
const { getSpaceCollection } = require("../mongo");

async function main() {
  const args = minimist(process.argv.slice(2));

  if (!args.space) {
    console.error("Must specify space id with argument --space=[spaceId]");
    return;
  }

  const space = spaces.find((s) => s.id === args.space);
  if (!space) {
    console.error(`Space with id "${args.space}" not found.`);
    return;
  }

  const spaceCol = await getSpaceCollection();
  const spaceData = {
    offline: false, // set default offline space
    ...space,
  };
  const result = await spaceCol.findOneAndUpdate(
    { id: space.id },
    { $set: spaceData },
    { upsert: true, returnDocument: "after" },
  );

  console.log(omit(result, ["_id"]));
  console.log(`Space "${space.id}" updated successfully.`);
}

main()
  .catch(console.error)
  .finally(() => {
    process.exit();
  });
