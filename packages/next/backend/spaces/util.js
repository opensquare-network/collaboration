const { getApi, getTotalBalance, getTokenBalance } = require("../services/node.service");
const { getSpaceCollection } = require("../mongo");

function getNetworkIdentity(network) {
  switch (network) {
    case "kusama":
      return {
        network: "kusama",
        ss58Format: 2,
      };
    default:
      return undefined;
  }
}

function createSpace(spaceConfig) {
  const { symbol, networks } = spaceConfig;

  return {
    ...spaceConfig,
    // A asset can be appear on multiple networks,
    // Each network has its own identity
    networks: networks?.map(network => {
      const { identity } = network;
      return {
        ...network,
        identity: getNetworkIdentity(identity),
      };
    }),
  };
}

async function getSpaces() {
  const spaceCol = await getSpaceCollection();
  const spaceConfigs = await spaceCol.find({}).toArray();
  return spaceConfigs.map(spaceConfig => {
    const space = createSpace(spaceConfig);
    return space;
  });
}

module.exports = {
  getSpaces,
};
