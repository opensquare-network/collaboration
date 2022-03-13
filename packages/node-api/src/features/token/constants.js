const { chains, symbols } = require("../../constants");

const supportedChainSymbols = {
  [chains.karura]: [symbols.RMRK, symbols.KSM, symbols.ARIS],
  [chains.bifrost]: [symbols.RMRK, symbols.KSM],
};

const chainOrmlTokenId = {
  [chains.karura]: {
    [symbols.RMRK]: {
      ForeignAsset: 0,
    },
    [symbols.KSM]: {
      Token: symbols.KSM,
    },
    [symbols.ARIS]: {
      ForeignAsset: 1,
    },
  },
  [chains.bifrost]: {
    [symbols.RMRK]: {
      Token: symbols.RMRK,
    },
    [symbols.KSM]: {
      Token: symbols.KSM,
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
