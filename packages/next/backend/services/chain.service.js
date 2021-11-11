const spaceServices = require("../spaces");
const { getFinalizedHeight } = require("./node.service");

let latestHeights = {};

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
    setInterval(callback, 12*1000);
  })
}

function getLatestHeight(space) {
  return latestHeights[space];
}

module.exports = {
  startUpdateHeight,
  getLatestHeight,
};
