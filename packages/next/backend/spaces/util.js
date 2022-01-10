const { getApi, getTotalBalance, getTokenBalance } = require("../services/node.service");
const { getSpaceCollection } = require("../mongo");

function createSpace({
  name,
  display,
  network,
  symbol,
  ss58Format,
  decimals,
  proposeThreshold,
  voteThreshold,
  weightStrategy,
  identity,
}) {
  const _getApi = () => getApi(network);

  const _getBalance = async (blockHeight, address) => {
    const api = await _getApi();
    return await getTotalBalance(api, blockHeight, address);
  };

  return {
    name,
    display,
    network,
    symbol,
    ss58Format,
    decimals,
    proposeThreshold,
    voteThreshold,
    weightStrategy,
    identity,
    getApi: _getApi,
    getBalance: _getBalance,
  };
}

function createTokenSpace({
  name,
  display,
  network,
  assetId,
  symbol,
  ss58Format,
  decimals,
  proposeThreshold,
  voteThreshold,
  weightStrategy,
  identity,
}) {
  const _getApi = () => getApi(network);

  const _getBalance = async (blockHeight, address) => {
    const api = await _getApi();
    return await getTokenBalance(api, assetId, blockHeight, address);
  };

  return {
    name,
    display,
    network,
    assetId,
    symbol,
    ss58Format,
    decimals,
    proposeThreshold,
    voteThreshold,
    weightStrategy,
    identity,
    getApi: _getApi,
    getBalance: _getBalance,
  };
}

function normalizeSpaceConfig(spaceConfig) {
  return {
    ...spaceConfig,
    identity: (spaceConfig.identity === "kusama")
      ? {
          network: "kusama",
          ss58Format: 2,
        }
      : null,
  };
}

async function getSpaces() {
  const spaceCol = await getSpaceCollection();
  const spaceConfigs = await spaceCol.find({}).toArray();
  return spaceConfigs.map(spaceConfig => {
    const config = normalizeSpaceConfig(spaceConfig)
    if (config.assetId !== undefined) {
      return createTokenSpace(config);
    } else {
      return createSpace(config);
    }
  });
}

module.exports = {
  getSpaces,
};
