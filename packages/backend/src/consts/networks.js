const networks = Object.freeze({
  statemine: "statemine",
  bifrost: "bifrost",
  karura: "karura",
  kusama: "kusama",
  polkadot: "polkadot",
  khala: "khala",
  phala: "phala",
  kintsugi: "kintsugi",
  interlay: "interlay",
  moonriver: "moonriver",
  moonbeam: "moonbeam",
  acala: "acala",
  crust: "crust",
  turing: "turing",
  darwinia: "darwinia",
  crab: "crab",
  polkadex: "polkadex",
  centrifuge: "centrifuge",
  litmus: "litmus",
  ethereum: "ethereum",
});

const evmNetworks = [networks.moonbeam, networks.moonriver, networks.ethereum];

module.exports = {
  networks,
  evmNetworks,
};
