const chains = {
  polkadot: "polkadot",
  kusama: "kusama",
  karura: "karura",
  khala: "khala",
  phala: "phala",
  statemine: "statemine",
  statemint: "statemint",
  bifrost: "bifrost", // bifrost is bifrost-kusama
  bifrostPolkadot: "bifrost-polkadot",
  acala: "acala",
  astar: "astar",
  astarEvm: "astar_evm",
  darwinia: "darwinia",
  turing: "turing",
  crab: "crab",
  polkadex: "polkadex",
  litmus: "litmus",
  shiden: "shiden",
  altair: "altair",
  parallel: "parallel",
  hydradx: "hydradx",
  hydration: "hydration",
  rococo: "rococo",
  moonbeam: "moonbeam",
  moonriver: "moonriver",
  creditcoin: "creditcoin",
  creditcoinNative: "creditcoin_native",
};

const oneSecond = 1000;
const sixSecond = 6 * oneSecond;
const twelveSecond = 12 * oneSecond;
const thirteenSecond = 13 * oneSecond;

const evmChains = Object.freeze({
  moonriver: "moonriver",
  moonbeam: "moonbeam",
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
  khala: twelveSecond,
  phala: twelveSecond,
  statemine: twelveSecond,
  statemint: twelveSecond,
  bifrost: twelveSecond,
  [chains.polkadex]: twelveSecond,
  [chains.acala]: twelveSecond,
  [chains.darwinia]: sixSecond,
  [chains.crab]: sixSecond,
  [chains.turing]: twelveSecond,
  [chains.altair]: twelveSecond,
  [chains.litmus]: twelveSecond,
  [chains.shiden]: twelveSecond,
  [chains.parallel]: twelveSecond,
  [chains.hydradx]: twelveSecond,
  [chains.hydration]: twelveSecond,
  [evmChains.moonriver]: twelveSecond,
  [evmChains.moonbeam]: twelveSecond,
  [evmChains.ethereum]: thirteenSecond,
  [evmChains.creditcoin_evm]: twelveSecond,
};

const symbols = {
  RMRK: "RMRK",
  KSM: "KSM",
  ARIS: "ARIS",
  KINT: "KINT",
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
