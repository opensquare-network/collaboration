const { typesBundleForPolkadot } = require("@acala-network/type-definitions");

const options = {
  typesBundle: { ...typesBundleForPolkadot }
}

module.exports = {
  karuraOptions: options,
}
