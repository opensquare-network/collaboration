const networks = Object.freeze({
  statemine: "statemine",
  statemint: "statemint",
  bifrost: "bifrost", // bifrost is bifrost-kusama
  bifrostPolkadot: "bifrost-polkadot",
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
  zeitgeist: "zeitgeist",
  shiden: "shiden",
  altair: "altair",
  parallel: "parallel",
  basilisk: "basilisk",
  hydradx: "hydradx",
  hydration: "hydration",
  ethereum: "ethereum",
  rococo: "rococo",
  stafi: "stafi",
  creditcoin: "creditcoin",
  creditcoin_evm: "creditcoin_evm",
  creditcoin_native: "creditcoin_native",
});

const evmNetworks = [
  networks.moonbeam,
  networks.moonriver,
  networks.ethereum,
  networks.creditcoin_evm,
];

module.exports = {
  networks,
  evmNetworks,
};
