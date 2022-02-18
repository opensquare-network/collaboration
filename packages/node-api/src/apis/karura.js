const {
  rpc: acalaRpc,
  typesAlias: acalaTypesAlias,
  typesBundle: acalaTypesBundle,
  signedExtensions: acalaSignedExtensions,
} = require("@acala-network/types");
const { derive: acalaDerives } = require("@acala-network/api-derive");

const options = {
  rpc: {
    ...acalaRpc,
  },
  typesAlias: {
    ...acalaTypesAlias,
  },
  typesBundle: {
    spec: {
      acala: {
        ...acalaTypesBundle?.spec?.acala,
      },
      mandala: {
        ...acalaTypesBundle?.spec?.mandala,
      },
      karura: {
        ...acalaTypesBundle?.spec?.karura,
      },
    },
  },
  signedExtensions: {
    ...acalaSignedExtensions,
  },
  derives: {
    ...acalaDerives,
  },
};

module.exports = {
  karuraOptions: options,
}
