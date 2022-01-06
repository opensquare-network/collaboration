const { getSpaces } = require("./util");

const spaces = {};

function reloadSpaces() {
  getSpaces().then(allSpaces => {
    for (const key in spaces) {
      delete spaces[key];
    }
    allSpaces.forEach(item => {
      spaces[item.name] = item;
    });
  });
}

reloadSpaces();

module.exports = {
  spaces,
  reloadSpaces,
};
