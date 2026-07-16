const { chains } = require("../constants");

const chainEndpointPrefixMap = {
  [chains.kusama]: "KSM",
  [chains.polkadot]: "DOT",
  [chains.karura]: "KAR",
  [chains.statemine]: "STATEMINE",
  [chains.statemint]: "STATEMINT",
  [chains.bifrost]: "BNC_KSM",
  [chains.bifrostPolkadot]: "BNC_DOT",
  [chains.acala]: "ACA",
  [chains.astar]: "ASTR",
  [chains.darwinia]: "RING",
  [chains.shiden]: "SDN",
  [chains.hydradx]: "HDX",
  [chains.hydration]: "HDX",
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
