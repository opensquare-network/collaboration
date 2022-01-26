const {
  typesBundleForPolkadot: bifrostTypesBundleForPolkadot,
} = require("@bifrost-finance/type-definitions");

const options = {
  typesBundle: {
    spec: {
      bifrost: bifrostTypesBundleForPolkadot.spec.bifrost,
      "bifrost-parachain": bifrostTypesBundleForPolkadot.spec.bifrost,
    },
  }
}

module.exports = {
  bifrostOptions: options,
}
