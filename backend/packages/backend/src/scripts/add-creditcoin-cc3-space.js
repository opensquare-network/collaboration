const dotenv = require("dotenv");
dotenv.config();

const { creditcoinConfig } = require("./spaces/creditcoin");
const { getSpaceCollection } = require("../mongo");

async function main() {
  const spaceData = {
    ...creditcoinConfig,
    offline: false,
  };
  const spaceCol = await getSpaceCollection();
  await spaceCol.updateOne(
    { id: spaceData.id },
    { $set: spaceData },
    { upsert: true },
  );
}

main()
  .catch(console.error)
  .then(() => process.exit(0));
