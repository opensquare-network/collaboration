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
  moonriver: "moonriver",
  moonbeam: "moonbeam",
  acala: "acala",
  astar: "astar",
  astar_evm: "astar_evm",
  turing: "turing",
  darwinia: "darwinia",
  crab: "crab",
  polkadex: "polkadex",
  litmus: "litmus",
  shiden: "shiden",
  altair: "altair",
  parallel: "parallel",
  hydradx: "hydradx",
  hydration: "hydration",
  ethereum: "ethereum",
  rococo: "rococo",
  creditcoin: "creditcoin",
  creditcoin_evm: "creditcoin_evm",
  creditcoin_native: "creditcoin_native",
});

const evmNetworks = [
  networks.moonbeam,
  networks.moonriver,
  networks.ethereum,
  networks.creditcoin_evm,
  networks.astar_evm,
];

module.exports = {
  networks,
  evmNetworks,
};
