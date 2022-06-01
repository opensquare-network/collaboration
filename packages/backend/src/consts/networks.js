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
  turing: "turing",
  darwinia: "darwinia",
  ethereum: "ethereum",
});

const evmNetworks = [networks.moonbeam, networks.moonriver, networks.ethereum];

module.exports = {
  networks,
  evmNetworks,
};
