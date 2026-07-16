const chains = {
  polkadot: "polkadot",
  kusama: "kusama",
  karura: "karura",
  statemine: "statemine",
  statemint: "statemint",
  bifrost: "bifrost", // bifrost is bifrost-kusama
  bifrostPolkadot: "bifrost-polkadot",
  acala: "acala",
  astar: "astar",
  astarEvm: "astar_evm",
  darwinia: "darwinia",
  shiden: "shiden",
  hydradx: "hydradx",
  hydration: "hydration",
  creditcoin: "creditcoin",
  creditcoinNative: "creditcoin_native",
};

const oneSecond = 1000;
const sixSecond = 6 * oneSecond;
const twelveSecond = 12 * oneSecond;
const thirteenSecond = 13 * oneSecond;

const evmChains = Object.freeze({
  ethereum: "ethereum",
  creditcoin_evm: "creditcoin_evm",
  astar_evm: "astar_evm",
});

const chainBlockTime = {
  polkadot: sixSecond,
  kusama: sixSecond,
  astar: sixSecond,
  astar_evm: sixSecond,
  karura: twelveSecond,
  statemine: twelveSecond,
  statemint: twelveSecond,
  bifrost: twelveSecond,
  [chains.acala]: twelveSecond,
  [chains.darwinia]: sixSecond,
  [chains.shiden]: twelveSecond,
  [chains.hydradx]: twelveSecond,
  [chains.hydration]: twelveSecond,
  [evmChains.ethereum]: thirteenSecond,
  [evmChains.creditcoin_evm]: twelveSecond,
};

const symbols = {
  KSM: "KSM",
  ARIS: "ARIS",
  KAR: "KAR",
  BNC: "BNC",
  LKSM: "LKSM",
  taiKSM: "taiKSM",
};

module.exports = {
  chains,
  evmChains,
  symbols,
  chainBlockTime,
  twelveSecond,
};
