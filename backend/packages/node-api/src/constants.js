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
  kintsugi: "kintsugi",
  interlay: "interlay",
  acala: "acala",
  crust: "crust",
  darwinia: "darwinia",
  turing: "turing",
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
  rococo: "rococo",
  stafi: "stafi",
  moonbeam: "moonbeam",
  moonriver: "moonriver",
  creditcoin: "creditcoin",
  creditcoinNative: "creditcoin_native",
};

const noProxyChains = [chains.kintsugi, chains.interlay, chains.crust];

const oneSecond = 1000;
const sixSecond = 6 * oneSecond;
const twelveSecond = 12 * oneSecond;
const thirteenSecond = 13 * oneSecond;

const evmChains = Object.freeze({
  moonriver: "moonriver",
  moonbeam: "moonbeam",
  ethereum: "ethereum",
  creditcoin_evm: "creditcoin_evm",
});

const chainBlockTime = {
  polkadot: sixSecond,
  kusama: sixSecond,
  karura: twelveSecond,
  khala: twelveSecond,
  phala: twelveSecond,
  statemine: twelveSecond,
  statemint: twelveSecond,
  bifrost: twelveSecond,
  kintsugi: twelveSecond,
  [chains.polkadex]: twelveSecond,
  interlay: twelveSecond,
  crust: sixSecond,
  [chains.acala]: twelveSecond,
  [chains.darwinia]: sixSecond,
  [chains.crab]: sixSecond,
  [chains.turing]: twelveSecond,
  [chains.centrifuge]: twelveSecond,
  [chains.altair]: twelveSecond,
  [chains.litmus]: twelveSecond,
  [chains.zeitgeist]: twelveSecond,
  [chains.shiden]: twelveSecond,
  [chains.parallel]: twelveSecond,
  [chains.basilisk]: twelveSecond,
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
  noProxyChains,
  evmChains,
  symbols,
  chainBlockTime,
  twelveSecond,
};
