const { chains } = require("../../constants");

const statemineAssetCommon = {
  isChain: false,
  chain: chains.statemine,
  isNative: false,
  isAssetsModule: true,
};

const tokens = {
  ksm: {
    isChain: true,
    chain: chains.kusama,
    isNative: true,
  },
  dot: {
    isChain: true,
    chain: chains.polkadot,
    isNative: true,
  },
  rmrk: {
    ...statemineAssetCommon,
    assetId: 8,
  },
  kar: {
    isChain: true,
    chain: chains.karura,
    isNative: true,
  },
  pha: {
    isChain: true,
    chain: chains.khala,
    isNative: true,
  },
  bnc: {
    isChain: true,
    chain: chains.bifrost,
    isNative: true,
  },
  aris: {
    ...statemineAssetCommon,
    assetId: 16,
  },
  chrwna: {
    ...statemineAssetCommon,
    assetId: 567,
  },
  kint: {
    isChain: true,
    chain: chains.kintsugi,
    isNative: false,
    isOrml: true,
    moduleName: "tokens",
    currencyId: { token: "KINT" },
  },
  intr: {
    isChain: true,
    chain: chains.interlay,
    isNative: false,
    isOrml: true,
    moduleName: "tokens",
    currencyId: { token: "INTR" },
  },
};

module.exports = {
  tokens,
};
