const { typesBundleForPolkadot } = require("@acala-network/type-definitions");

const nodeSetting = {
  nodeUrl: process.env.KARURA_NODE_ENDPOINT || "wss://pub.elara.patract.io/karura",
  typesBundle: typesBundleForPolkadot,
};

module.exports = {
  nodeSetting,
};
