const { versionedKhala, typesChain } = require("@phala/typedefs");

const options = {
  typesBundle: {
    spec: {
      khala: versionedKhala,
    },
  },
  typesChain
}

module.exports = {
  khalaOptions: options
}
