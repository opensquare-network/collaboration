const lib = require("@interlay/interbtc-types");
const definitions = lib.default;

const kintsugiOptions = {
  spec: {
    "interbtc-parachain": definitions,
  },
  rpc: definitions.rpc,
};

module.exports = {
  kintsugiOptions,
}
