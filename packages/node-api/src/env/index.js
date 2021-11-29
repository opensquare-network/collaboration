const { chains } = require("../constants")

// [chain, endpoints]
const endpoints = Object.values(chains).map(chain => {
  let endpoints = [];
  if (chains.polkadot === chain) {
    endpoints = (process.env.DOT_ENDPOINTS || '').split(';')
  } else if (chains.kusama === chain) {
    endpoints = (process.env.KSM_ENDPOINTS || '').split(';')
  } else if (chains.karura === chain) {
    endpoints = (process.env.KAR_ENDPOINTS || '').split(';')
  } else if (chains.khala === chain) {
    endpoints = (process.env.KHA_ENDPOINTS || '').split(';')
  } else if (chains.statemine === chain) {
    endpoints = (process.env.STATEMINE_ENDPOINTS || '').split(';')
  }

  return {
    chain,
    endpoints,
  }
})

function getEndpoints() {
  return endpoints;
}

module.exports = {
  getEndpoints,
}
