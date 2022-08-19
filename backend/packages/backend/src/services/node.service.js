const BigNumber = require("bignumber.js");
const { evmNetworks } = require("../consts/networks");
const { HttpError } = require("../exc");
const { NODE_API_ENDPOINT } = require("../env");
const { isTestAccount } = require("../utils");
const { fetchApi } = require("../utils/fech.api");
const { adaptBalance } = require("../utils/balance");

async function getSystemBalance(network, blockHeight, address) {
  if (isTestAccount(address)) {
    return {
      free: process.env.TEST_ACCOUNT_BALANCE || "10000000000000",
      reserved: 0,
    };
  }

  const url = `${NODE_API_ENDPOINT}/${network}/balance/${address}/${blockHeight}`;
  try {
    return await fetchApi(url);
  } catch (err) {
    throw new HttpError(500, "Failed to get account balance");
  }
}

async function checkDelegation(network, delegatee, delegator, blockHeight) {
  if (isTestAccount(delegator)) {
    return;
  }

  let url = `${NODE_API_ENDPOINT}/${network}/proxy/${delegator}/${delegatee}/${blockHeight}`;
  let isProxy = false;
  try {
    const json = await fetchApi(url);
    isProxy = json?.isProxy;
  } catch (err) {
    throw new HttpError(500, "Failed to verify the proxy address");
  }

  if (!isProxy) {
    throw new HttpError(400, "You are not a proxy of the given address");
  }
}

async function getEvmAddressBalance({ network }, contract, address, height) {
  if (isTestAccount(address)) {
    return {
      balance: process.env.TEST_ACCOUNT_BALANCE || "10000000000000",
    };
  }

  let url = `${NODE_API_ENDPOINT}`;
  url += `/evm/chain/${network}/contract/${contract}/address/${address}/height/${height}`;

  const { balance } = await fetchApi(url);
  return { balance };
}

async function getChainHeight(chain, time) {
  let url = `${NODE_API_ENDPOINT}/`;
  if (evmNetworks.includes(chain)) {
    url += `evm/chain/${chain}/height`;
    if (time) {
      url += `/${time}`;
    }
  } else {
    url += `${chain}/chain/height`;
    if (time) {
      url += `?time=${time}`;
    }
  }

  try {
    return await fetchApi(url);
  } catch (e) {
    throw new HttpError(500, "Failed to get chain height");
  }
}

async function getTotalBalance(network, blockHeight, address) {
  const { free, reserved } = await getSystemBalance(
    network,
    blockHeight,
    address
  );
  return new BigNumber(free || 0).plus(reserved || 0).toString();
}

async function getTokenBalance(network, assetIdOrSymbol, blockHeight, address) {
  if (isTestAccount(address)) {
    return process.env.TEST_ACCOUNT_BALANCE;
  }

  let url = `${NODE_API_ENDPOINT}/${network}/token/${assetIdOrSymbol}/account/${address}/${blockHeight}`;
  try {
    const { free, reserved } = await fetchApi(url);
    return new BigNumber(free || 0).plus(reserved || 0).toString();
  } catch (err) {
    throw new HttpError(500, "Failed to get account token balance");
  }
}

async function getBalanceFromMultiAssetsNetwork({
  network,
  networkName,
  address,
  blockHeight,
  spaceSymbol,
  spaceDecimals,
}) {
  const details = await Promise.all(
    network.assets.map(async (asset) => {
      const { type, assetId, contract } = asset;
      const decimals = asset.decimals ?? network.decimals ?? spaceDecimals;
      const symbol = asset.symbol ?? network.symbol ?? spaceSymbol;
      const multiplier = asset.multiplier ?? network.multiplier ?? 1;

      const balance = await getAssetBalanceFromNetwork({
        networkName,
        type,
        assetId,
        contract,
        symbol,
        blockHeight,
        address,
      });

      return {
        symbol,
        decimals,
        balance,
        multiplier,
      };
    })
  );

  const balanceOf = details.reduce(
    (prev, curr) =>
      prev +
      adaptBalance(curr.balance, curr.decimals, spaceDecimals) *
        curr.multiplier,
    0
  );
  return {
    balanceOf,
    decimals: spaceDecimals,
    symbol: spaceSymbol,
    details,
  };
}

async function getBalanceFromSingleAssetNetwork({
  network,
  networkName,
  address,
  blockHeight,
  spaceSymbol,
  spaceDecimals,
}) {
  const { type, assetId, contract } = network;
  const decimals = network.decimals ?? spaceDecimals;
  const symbol = network.symbol ?? spaceSymbol;
  const multiplier = network.multiplier ?? 1;

  const balance = await getAssetBalanceFromNetwork({
    networkName,
    type,
    assetId,
    contract,
    symbol,
    blockHeight,
    address,
  });

  const balanceOf = adaptBalance(balance, decimals, spaceDecimals) * multiplier;

  return {
    balanceOf,
    decimals: spaceDecimals,
    symbol: spaceSymbol,
    details: [
      {
        symbol,
        decimals,
        balance,
        multiplier,
      },
    ],
  };
}

async function getBalanceFromNetwork({
  networksConfig,
  networkName,
  address,
  blockHeight,
}) {
  const spaceSymbol = networksConfig?.symbol;
  const spaceDecimals = networksConfig?.decimals;
  const network = networksConfig?.networks?.find(
    (n) => n.network === networkName
  );
  if (!network) {
    throw new HttpError(400, "Network not found");
  }

  if (network.assets) {
    return await getBalanceFromMultiAssetsNetwork({
      network,
      networkName,
      address,
      blockHeight,
      spaceSymbol,
      spaceDecimals,
    });
  } else {
    return await getBalanceFromSingleAssetNetwork({
      network,
      networkName,
      address,
      blockHeight,
      spaceSymbol,
      spaceDecimals,
    });
  }
}

async function getAssetBalanceFromNetwork({
  networkName,
  type,
  assetId,
  contract,
  symbol,
  blockHeight,
  address,
}) {
  if ("erc20" === type) {
    const { balance } = await getEvmAddressBalance(
      network,
      contract,
      address,
      blockHeight
    );
    return balance;
  }

  let balance;
  if (type === "asset") {
    balance = await getTokenBalance(networkName, assetId, blockHeight, address);
  } else if (type === "token") {
    balance = await getTokenBalance(networkName, symbol, blockHeight, address);
  } else {
    balance = await getTotalBalance(networkName, blockHeight, address);
  }

  return balance;
}

module.exports = {
  getTotalBalance,
  getTokenBalance,
  checkDelegation,
  getBalanceFromNetwork,
  getChainHeight,
  getEvmAddressBalance,
};
