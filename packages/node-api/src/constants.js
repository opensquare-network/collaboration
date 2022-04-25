const chains = {
  polkadot: "polkadot",
  kusama: "kusama",
  karura: "karura",
  khala: "khala",
  statemine: "statemine",
  bifrost: "bifrost",
  kintsugi: "kintsugi",
  interlay: "interlay",
  acala: "acala",
  crust: "crust",
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
});

const chainBlockTime = {
  polkadot: sixSecond,
  kusama: sixSecond,
  karura: twelveSecond,
  khala: twelveSecond,
  statemine: twelveSecond,
  bifrost: twelveSecond,
  kintsugi: twelveSecond,
  polkadex: twelveSecond,
  interlay: twelveSecond,
  crust: sixSecond,
  [chains.acala]: twelveSecond,
  [evmChains.moonriver]: twelveSecond,
  [evmChains.moonbeam]: twelveSecond,
  [evmChains.ethereum]: thirteenSecond,
};

const symbols = {
  RMRK: "RMRK",
  KSM: "KSM",
  ARIS: "ARIS",
  KINT: "KINT",
  KAR: "KAR",
};

const nodeTimeoutSeconds = 20;

module.exports = {
  chains,
  noProxyChains,
  evmChains,
  symbols,
  nodeTimeoutSeconds,
  chainBlockTime,
};
