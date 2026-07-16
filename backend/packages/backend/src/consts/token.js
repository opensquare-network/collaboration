const { networks } = require("./networks");
const tokens = Object.freeze({
  KSM: "KSM",
  DOT: "DOT",
  KAR: "KAR",
  BNC: "BNC",
  ARIS: "ARIS",
  CHRWNA: "CHRWNA",
});

const tokenParentChain = Object.freeze({
  [tokens.KSM]: networks.kusama,
  [tokens.DOT]: networks.polkadot,
  [tokens.KAR]: networks.karura,
  [tokens.BNC]: networks.bifrost,
  [tokens.ARIS]: networks.statemine,
  [tokens.CHRWNA]: networks.statemine,
});

module.exports = {
  tokens,
  tokenParentChain,
};
