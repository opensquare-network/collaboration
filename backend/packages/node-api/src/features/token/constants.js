const { chains, symbols } = require("../../constants");

const supportedChainSymbols = {
  [chains.karura]: [
    symbols.KSM,
    symbols.ARIS,
    symbols.BNC,
    symbols.LKSM,
    symbols.taiKSM,
  ],
  [chains.bifrost]: [symbols.KSM, symbols.KAR],
};

const chainOrmlTokenId = {
  [chains.karura]: {
    [symbols.KSM]: {
      Token: symbols.KSM,
    },
    [symbols.ARIS]: {
      ForeignAsset: 1,
    },
    [symbols.BNC]: {
      Token: symbols.BNC,
    },
    [symbols.LKSM]: {
      Token: symbols.LKSM,
    },
    [symbols.taiKSM]: {
      StableAssetPoolToken: 0,
    },
  },
  [chains.bifrost]: {
    [symbols.KSM]: {
      Token: symbols.KSM,
    },
    [symbols.KAR]: {
      Token: symbols.KAR,
    },
  },
};

const emptyBalance = {
  free: "0",
  reserved: "0",
};

module.exports = {
  supportedChainSymbols,
  chainOrmlTokenId,
  emptyBalance,
};
