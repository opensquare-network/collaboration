const lib = require("@interlay/interbtc-types");
const definitions = lib.default;

const interlayOptions = {
  spec: {
    "interbtc-parachain": definitions,
  },
  rpc: definitions.rpc,
};

module.exports = {
  interlayOptions,
};
