const { getSpaceCollection } = require("../mongo");

async function getSpaces() {
  const spaceCol = await getSpaceCollection();
  const spaceConfigs = await spaceCol.find({}).toArray();
  return spaceConfigs;
}

module.exports = {
  getSpaces,
};
