const { khala, versionedKhala } = require("@phala/typedefs");
const { getApi } = require("../utils/polkadotApi");
const { WeightStrategy, Networks } = require("../constants");
const {
  getEnvWeightStrategies,
  getEnvProposeThreshold,
  getEnvNodeEndpoint,
} = require("../env");

const weightStrategy = (getEnvWeightStrategies("khala") || WeightStrategy.BalanceOf).split(",");
const proposeThreshold = getEnvProposeThreshold("khala") || "1000000000000";

const nodeSetting = {
  nodeUrl: getEnvNodeEndpoint("khala") || "wss://khala.api.onfinality.io/public-ws",
  types: khala,
  typesBundle: {
    spec: {
      khala: versionedKhala,
    },
  }
};

function _getApi() {
  return getApi(nodeSetting);
}

module.exports = {
  ...Networks.Khala,
  relay: Networks.Kusama,
  nodeSetting,
  getApi: _getApi,
  proposeThreshold,
  weightStrategy,
};
