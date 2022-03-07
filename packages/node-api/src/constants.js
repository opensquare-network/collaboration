const chains = {
  polkadot: "polkadot",
  kusama: "kusama",
  karura: "karura",
  khala: "khala",
  statemine: "statemine",
  bifrost: "bifrost",
  kintsugi: "kintsugi",
};

const oneSecond = 1000;
const sixSecond = 6 * oneSecond;
const twelveSecond = 12 * oneSecond;

const chainBlockTime = {
  polkadot: sixSecond,
  kusama: sixSecond,
  karura: twelveSecond,
  khala: twelveSecond,
  statemine: twelveSecond,
  bifrost: twelveSecond,
  kintsugi: twelveSecond,
};

const symbols = {
  RMRK: "RMRK",
  KSM: "KSM",
};

const nodeTimeoutSeconds = 20;

module.exports = {
  chains,
  symbols,
  nodeTimeoutSeconds,
  chainBlockTime,
};
