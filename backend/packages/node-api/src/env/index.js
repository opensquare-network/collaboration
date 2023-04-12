const { chains } = require("../constants");

const chainEndpointPrefixMap = {
  [chains.kusama]: "KSM",
  [chains.polkadot]: "DOT",
  [chains.karura]: "KAR",
  [chains.khala]: "KHA",
  [chains.phala]: "PHA",
  [chains.statemine]: "STATEMINE",
  [chains.bifrost]: "BNC",
  [chains.kintsugi]: "KINT",
  [chains.polkadex]: "PDEX",
  [chains.interlay]: "INTR",
  [chains.acala]: "ACA",
  [chains.crust]: "CRU",
  [chains.darwinia]: "RING",
  [chains.crab]: "CRAB",
  [chains.turing]: "TUR",
  [chains.centrifuge]: "CFG",
  [chains.litmus]: "LIT",
  [chains.zeitgeist]: "ZTG",
  [chains.shiden]: "SDN",
  [chains.altair]: "AIR",
  [chains.parallel]: "PARA",
  [chains.basilisk]: "BSX",
  [chains.hydradx]: "HDX",
  [chains.rococo]: "ROC",
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
