const spaceServices = require("../spaces");
const { getFinalizedHeight } = require("./node.service");

let latestHeights = {};
let timer = {};

function startUpdateHeight() {
  Object.keys(spaceServices).map((space) => {
    const callback = async () => {
      try {
        const api = await spaceServices[space].getApi();
        const { height } = await getFinalizedHeight(api);
        latestHeights[space] = height;
      } catch (e) {
        console.error(`Failed to get ${space} chain height:`, e.message);
      }
    };

    callback();
    timer[space] = setInterval(callback, 12 * 1000);
  })
}

function stopUpdateHeight() {
  for (const space in timer) {
    clearInterval(timer[space]);
    delete timer[space];
  }
}

function getLatestHeight(space) {
  return latestHeights[space];
}

module.exports = {
  startUpdateHeight,
  stopUpdateHeight,
  getLatestHeight,
};
