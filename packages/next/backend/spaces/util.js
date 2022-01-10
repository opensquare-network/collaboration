const { getApi, getTotalBalance, getTokenBalance } = require("../services/node.service");
const { getSpaceCollection } = require("../mongo");

function createSpace({
  id,
  name,
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
    id,
    name,
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
  id,
  name,
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
    id,
    name,
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

function normailizeSpaceConfig(spaceConfig) {
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
  const spaces = spaceConfigs.map(spaceConfig => {
    const config = normailizeSpaceConfig(spaceConfig)
    if (config.assetId !== undefined) {
      return createTokenSpace(config);
    } else {
      return createSpace(config);
    }
  });
  return spaces;
}

module.exports = {
  getSpaces,
};
