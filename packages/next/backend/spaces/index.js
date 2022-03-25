const { getSpaces } = require("./util");

const spaces = {};
let spaceArr;

async function reloadSpaces() {
  const allSpaces = await getSpaces();
  spaceArr = allSpaces;

  for (const key in spaces) {
    delete spaces[key];
  }

  allSpaces.forEach((item) => {
    spaces[item.id] = item;
  });
}

/**
 *
 * @returns []
 */
function getAllSpaces() {
  return spaceArr;
}

module.exports = {
  spaces,
  reloadSpaces,
  getAllSpaces,
};
