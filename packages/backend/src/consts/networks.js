const networks = Object.freeze({
  statemine: "statemine",
  bifrost: "bifrost",
  karura: "karura",
  kusama: "kusama",
  polkadot: "polkadot",
  khala: "khala",
  kintsugi: "kintsugi",
  interlay: "interlay",
  moonriver: "moonriver",
  moonbeam: "moonbeam",
  acala: "acala",
  crust: "crust",
});

const evmNetworks = [networks.moonbeam, networks.moonriver];

module.exports = {
  networks,
  evmNetworks,
};
