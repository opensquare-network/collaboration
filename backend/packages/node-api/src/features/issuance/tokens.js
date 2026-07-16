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
  aca: {
    isChain: true,
    chain: chains.acala,
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
};

module.exports = {
  tokens,
};
