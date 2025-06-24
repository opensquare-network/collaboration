const escapeRegExp = require("lodash.escaperegexp");
const { getSpaceCollection } = require("../../mongo");

async function searchSpaces(search, page = 1, pageSize = 10) {
  const q = {
    name: {
      $regex: escapeRegExp(search),
      $options: "i",
    },
    offline: { $ne: true },
  };

  const spaceCol = await getSpaceCollection();
  const total = await spaceCol.countDocuments(q);
  const items = await spaceCol
    .find(q)
    .skip(pageSize * (page - 1))
    .limit(pageSize)
    .toArray();

  return {
    items,
    page,
    pageSize,
    total,
  };
}

module.exports = {
  searchSpaces,
};
