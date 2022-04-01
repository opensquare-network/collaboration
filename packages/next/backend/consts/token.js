const { networks } = require("./networks");
const tokens = Object.freeze({
  RMRK: "RMRK",
  KSM: "KSM",
  DOT: "DOT",
  KAR: "KAR",
  KINT: "KINT",
  PHA: "PHA",
  BNC: "BNC",
  ARIS: "ARIS",
  CHRWNA: "CHRWNA",
  INTR: "INTR",
});

const tokenParentChain = Object.freeze({
  [tokens.KINT]: networks.kintsugi,
  [tokens.RMRK]: networks.statemine,
  [tokens.KSM]: networks.kusama,
  [tokens.DOT]: networks.polkadot,
  [tokens.KAR]: networks.karura,
  [tokens.PHA]: networks.khala,
  [tokens.BNC]: networks.bifrost,
  [tokens.ARIS]: networks.statemine,
  [tokens.CHRWNA]: networks.statemine,
  [tokens.INTR]: networks.interlay,
});

module.exports = {
  tokens,
  tokenParentChain,
};
