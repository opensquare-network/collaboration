const { chains } = require("../constants");

// [chain, endpoints]
const endpoints = Object.values(chains).map((chain) => {
  let endpoints = [];
  if (chains.polkadot === chain) {
    endpoints = (process.env.DOT_ENDPOINTS || "").split(";");
  } else if (chains.kusama === chain) {
    endpoints = (process.env.KSM_ENDPOINTS || "").split(";");
  } else if (chains.karura === chain) {
    endpoints = (process.env.KAR_ENDPOINTS || "").split(";");
  } else if (chains.khala === chain) {
    endpoints = (process.env.KHA_ENDPOINTS || "").split(";");
  } else if (chains.phala === chain) {
    endpoints = (process.env.PHA_ENDPOINTS || "").split(";");
  } else if (chains.statemine === chain) {
    endpoints = (process.env.STATEMINE_ENDPOINTS || "").split(";");
  } else if (chains.bifrost === chain) {
    endpoints = (process.env.BNC_ENDPOINTS || "").split(";");
  } else if (chains.kintsugi === chain) {
    endpoints = (process.env.KINT_ENDPOINTS || "").split(";");
  } else if (chains.polkadex === chain) {
    endpoints = (process.env.PDEX_ENDPOINTS || "").split(";");
  } else if (chains.interlay === chain) {
    endpoints = (process.env.INTR_ENDPOINTS || "").split(";");
  } else if (chains.acala === chain) {
    endpoints = (process.env.ACA_ENDPOINTS || "").split(";");
  } else if (chains.crust === chain) {
    endpoints = (process.env.CRU_ENDPOINTS || "").split(";");
  } else if (chains.darwinia === chain) {
    endpoints = (process.env.RING_ENDPOINTS || "").split(";");
  } else if (chains.crab === chain) {
    endpoints = (process.env.CRAB_ENDPOINTS || "").split(";");
  } else if (chains.turing === chain) {
    endpoints = (process.env.TUR_ENDPOINTS || "").split(";");
  } else if (chains.polkadex === chain) {
    endpoints = (process.env.PDEX_ENDPOINTS || "").split(";");
  } else if (chains.centrifuge === chain) {
    endpoints = (process.env.CFG_ENDPOINTS || "").split(";");
  } else if (chains.litmus === chain) {
    endpoints = (process.env.LITMUS_ENDPOINTS || "").split(";");
  } else if (chains.zeitgeist === chain) {
    endpoints = (process.env.ZTG_ENDPOINTS || "").split(";");
  } else if (chains.shiden === chain) {
    endpoints = (process.env.SDN_ENDPOINTS || "").split(";");
  } else if (chains.altair === chain) {
    endpoints = (process.env.AIR_ENDPOINTS || "").split(";");
  } else if (chains.parallel === chain) {
    endpoints = (process.env.PARA_ENDPOINTS || "").split(";");
  }

  return {
    chain,
    endpoints,
  };
});

function getEndpoints() {
  return endpoints;
}

module.exports = {
  getEndpoints,
};
