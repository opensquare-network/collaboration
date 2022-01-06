const { spaces: spaceServices } = require("../spaces");
const { getFinalizedHeight } = require("./node.service");

let latestHeights = {};
let timer = null;

function startUpdateHeight() {
  const doUpdate = () => {
    Object.keys(spaceServices).forEach(async (space) => {
      try {
        const api = await spaceServices[space].getApi();
        const { height } = await getFinalizedHeight(api);
        latestHeights[space] = height;
      } catch (e) {
        console.error(`Failed to get ${space} chain height:`, e.message);
      }
    })
  };

  setTimeout(doUpdate, 1000);
  timer = setInterval(doUpdate, 12 * 1000);
}

function stopUpdateHeight() {
  clearInterval(timer);
  timer = null;
}

function getLatestHeight(space) {
  return latestHeights[space];
}

module.exports = {
  startUpdateHeight,
  stopUpdateHeight,
  getLatestHeight,
};
