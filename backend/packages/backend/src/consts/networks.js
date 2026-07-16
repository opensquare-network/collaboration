const networks = Object.freeze({
  statemine: "statemine",
  statemint: "statemint",
  bifrost: "bifrost", // bifrost is bifrost-kusama
  bifrostPolkadot: "bifrost-polkadot",
  karura: "karura",
  kusama: "kusama",
  polkadot: "polkadot",
  acala: "acala",
  astar: "astar",
  astar_evm: "astar_evm",
  darwinia: "darwinia",
  shiden: "shiden",
  hydradx: "hydradx",
  hydration: "hydration",
  ethereum: "ethereum",
  creditcoin: "creditcoin",
  creditcoin_evm: "creditcoin_evm",
  creditcoin_native: "creditcoin_native",
});

const evmNetworks = [
  networks.ethereum,
  networks.creditcoin_evm,
  networks.astar_evm,
];

module.exports = {
  networks,
  evmNetworks,
};
