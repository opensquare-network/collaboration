const { nodeTimeoutSeconds } = require("../constants");
const { statusLogger } = require("../logger");
const { chains } = require("../constants");
const { ApiPromise, WsProvider } = require("@polkadot/api");
const { getEndpoints } = require("../env");
const {
  bifrostOptions,
  khalaOptions,
  karuraOptions,
  polkadexOptions,
  kintsugiOptions,
  crustOptions,
  centrifugeOptions,
} = require("@osn/provider-options");

/**
 * {polkadot: [{ endpoint: 'wss:...', api }]}
 */
const chainApis = {};

const rejectInTime = (seconds) =>
  new Promise((resolve, reject) => setTimeout(reject, seconds * 1000));

async function reConnect(network, endpoint) {
  const nowApis = chainApis[network] || [];

  const index = nowApis.findIndex(({ endpoint: url }) => url === endpoint);
  if (index >= 0) {
    const [targetApi] = nowApis.splice(index, 1);
    if (targetApi && targetApi.api) {
      await targetApi.api.disconnect();
    }
  }

  console.log(`re-connect network: ${network} with endpoint: ${endpoint}`);
  await createApi(network, endpoint);
  statusLogger.info(`Reconnect to ${network} ${endpoint}`);
}

async function createApi(network, endpoint) {
  const provider = new WsProvider(endpoint, 100);

  let options = {};
  if ([chains.karura, chains.acala].includes(network)) {
    options = karuraOptions;
  } else if (chains.khala === network) {
    options = khalaOptions;
  } else if (chains.bifrost === network) {
    options = bifrostOptions;
  } else if (chains.polkadex === network) {
    options = polkadexOptions;
  } else if ([chains.kintsugi, chains.interlay].includes(network)) {
    options = kintsugiOptions;
  } else if (chains.crust === network) {
    options = crustOptions;
  } else if (chains.centrifuge === network) {
    options = centrifugeOptions;
  }

  let api;
  try {
    api = await ApiPromise.create({ provider, ...options });
  } catch (e) {
    statusLogger.error(`Can not connect to ${network} ${endpoint}`);
    throw e;
  }

  api.on("error", (err) => {
    reConnect(network, endpoint);
  });
  api.on("disconnected", () => {
    reConnect(network, endpoint);
  });

  const nowApis = chainApis[network] || [];
  if (nowApis.findIndex((api) => api.endpoint === endpoint) >= 0) {
    statusLogger.info(`${network} ${endpoint} existed, ignore`);
    return;
  }

  const nodeInfo = {
    endpoint,
    api: await api.isReady,
  };
  chainApis[network] = [...nowApis, nodeInfo];
}

async function createApiInLimitTime(network, endpoint) {
  return Promise.race([
    createApi(network, endpoint),
    rejectInTime(nodeTimeoutSeconds),
  ]);
}

async function createApiForChain({ chain, endpoints }) {
  for (const endpoint of endpoints) {
    if (!endpoint) {
      continue;
    }

    try {
      await createApiInLimitTime(chain, endpoint);
      console.log(`${chain}: ${endpoint} created!`);
    } catch (e) {
      statusLogger.info(
        `Can not connected to ${endpoint} in ${nodeTimeoutSeconds} seconds, just disconnect it`
      );
    }
  }
}

async function createChainApis() {
  const chainEndpoints = getEndpoints();

  const promises = [];
  for (const { chain, endpoints } of chainEndpoints) {
    if ((endpoints || []).length > 0) {
      promises.push(createApiForChain({ chain, endpoints }));
    }
  }

  return Promise.all(promises);
}

function getApis(chain) {
  return (chainApis[chain] || []).map(({ api }) => api);
}

function logApiStatus() {
  Object.entries(chainApis).map(([chain, apis]) => {
    statusLogger.info(`chain: ${chain}`);
    for (const { endpoint, api } of apis) {
      statusLogger.info(`\t ${endpoint} connected: ${api.isConnected}`);
    }
  });
}

module.exports = {
  createChainApis,
  getApis,
  logApiStatus,
};
