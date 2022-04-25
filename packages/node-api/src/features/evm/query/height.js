const { getProviders } = require("../providers");

async function queryHeightFromOneProvider(provider) {
  let promises = [];
  for (let i = 0; i < 2; i++) {
    promises.push(provider.getBlockNumber());
  }

  return Promise.any(promises);
}

async function getBlockNumber(network) {
  const providers = getProviders(network);

  let promises = [];
  for (const provider of providers) {
    promises.push(queryHeightFromOneProvider(provider));
  }

  return Promise.any(promises);
}

module.exports = {
  getBlockNumber,
};
