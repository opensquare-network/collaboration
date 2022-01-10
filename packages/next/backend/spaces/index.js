const { getSpaces } = require("./util");

const spaces = {};

function reloadSpaces() {
  return getSpaces().then(allSpaces => {
    for (const key in spaces) {
      delete spaces[key];
    }
    allSpaces.forEach(item => {
      spaces[item.id] = item;
    });
  });
}

module.exports = {
  spaces,
  reloadSpaces,
};
