const { chains } = require("../constants");

const chainEndpointPrefixMap = {
  [chains.kusama]: "KSM",
  [chains.polkadot]: "DOT",
  [chains.karura]: "KAR",
  [chains.khala]: "KHA",
  [chains.phala]: "PHA",
  [chains.statemine]: "STATEMINE",
  [chains.statemint]: "STATEMINT",
  [chains.bifrost]: "BNC_KSM",
  [chains.bifrostPolkadot]: "BNC_DOT",
  [chains.polkadex]: "PDEX",
  [chains.acala]: "ACA",
  [chains.astar]: "ASTR",
  [chains.darwinia]: "RING",
  [chains.crab]: "CRAB",
  [chains.turing]: "TUR",
  [chains.litmus]: "LIT",
  [chains.shiden]: "SDN",
  [chains.altair]: "AIR",
  [chains.parallel]: "PARA",
  [chains.hydradx]: "HDX",
  [chains.hydration]: "HDX",
  [chains.rococo]: "ROC",
  [chains.moonbeam]: "GLMR",
  [chains.moonriver]: "MOVR",
  [chains.creditcoin]: "CTC",
  [chains.creditcoinNative]: "CTC_CC3",
};

// [chain, endpoints]
const endpoints = Object.values(chains).map((chain) => {
  let chainEndpoints = (
    process.env[`${chainEndpointPrefixMap[chain]}_ENDPOINTS`] || ""
  ).split(";");
  return {
    chain,
    endpoints: chainEndpoints,
  };
});

function getEndpoints() {
  return endpoints;
}

module.exports = {
  getEndpoints,
};
