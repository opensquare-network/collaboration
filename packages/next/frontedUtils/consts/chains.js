export const CHAINS = Object.freeze({
  polkadot: "polkadot",
  kusama: "kusama",
  statemine: "statemine",
  karura: "karura",
  khala: "khala",
  bifrost: "bifrost",
  kintsugi: "kintsugi",
  polkadex: "polkadex",
  interlay: "interlay",
  moonriver: "moonriver",
  acala: "acala",
  turing: "turing",
  crust: "crust",
  crab: "crab",
  ethereum: "ethereum",
});

export const evmChains = [CHAINS.moonriver, CHAINS.ethereum];

export const nonProxyChains = [...evmChains, CHAINS.kintsugi, CHAINS.interlay];

export const evmChainId = Object.freeze({
  [CHAINS.moonriver]: 1285,
  [CHAINS.ethereum]: 1,
});

export const chainSs58Format = Object.freeze({
  [CHAINS.polkadot]: 0,
  [CHAINS.kusama]: 2,
  [CHAINS.statemine]: 2,
  [CHAINS.karura]: 8,
  [CHAINS.khala]: 30,
  [CHAINS.bifrost]: 6,
  [CHAINS.kintsugi]: 2092,
  [CHAINS.polkadex]: 88,
  [CHAINS.interlay]: 2032,
  [CHAINS.acala]: 10,
  [CHAINS.crust]: 66,
  [CHAINS.turing]: 51,
});
