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
  crust: "crust",
});

export const evmChains = [CHAINS.moonriver];

export const nonProxyChains = [
  CHAINS.moonriver,
  CHAINS.kintsugi,
  CHAINS.interlay,
];

export const evmChainId = Object.freeze({
  [CHAINS.moonriver]: 1285,
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
});
