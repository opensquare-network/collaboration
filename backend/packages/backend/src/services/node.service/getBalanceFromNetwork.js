const BigNumber = require("bignumber.js");
const { HttpError } = require("../../exc");
const { adaptBalance } = require("../../utils/balance");
const { getEvmAddressBalance } = require("./getEvmAddressBalance");
const { getTokenBalance } = require("./getTokenBalance");
const { getTotalBalance } = require("./getTotalBalance");
const { getStellaSwapAddressStaking } = require("./getStellaSwapBalance");
const { getEvmNativeBalance } = require("./getEvmNativeBalance");

async function getBalanceFromMultiAssetsNetwork({
  network,
  networkName,
  address,
  blockHeight,
  baseSymbol,
  baseDecimals,
}) {
  const details = await Promise.all(
    network.assets.map(async (asset) => {
      const { type, assetId, contract, votingThreshold } = asset;
      const decimals = asset.decimals ?? network.decimals ?? baseDecimals;
      const symbol = asset.symbol ?? network.symbol ?? baseSymbol;
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

      const item = {
        symbol,
        decimals,
        balance,
        multiplier,
        votingThreshold,
      };

      if (asset.assetName) {
        item.assetName = asset.assetName;
      }

      return item;
    }),
  );

  const balanceOf = details.reduce((prev, curr) => {
    if (new BigNumber(curr.balance).lt(curr.votingThreshold)) {
      return prev;
    }
    return adaptBalance(curr.balance, curr.decimals, baseDecimals)
      .times(curr.multiplier)
      .plus(prev);
  }, 0);

  return {
    balanceOf: balanceOf.toString(),
    decimals: baseDecimals,
    symbol: baseSymbol,
    details,
  };
}

async function getBalanceFromSingleAssetNetwork({
  network,
  networkName,
  address,
  blockHeight,
  baseSymbol,
  baseDecimals,
}) {
  const { type, assetId, contract } = network;
  const decimals = network.decimals ?? baseDecimals;
  const symbol = network.symbol ?? baseSymbol;
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

  const balanceOf = adaptBalance(balance, decimals, baseDecimals).times(
    multiplier,
  );

  return {
    balanceOf: balanceOf.toString(),
    decimals: baseDecimals,
    symbol: baseSymbol,
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
  const baseSymbol = networksConfig?.symbol;
  const baseDecimals = networksConfig?.decimals;
  const network = networksConfig?.networks?.find(
    (n) => n.network === networkName,
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
      baseSymbol,
      baseDecimals,
    });
  } else {
    return await getBalanceFromSingleAssetNetwork({
      network,
      networkName,
      address,
      blockHeight,
      baseSymbol,
      baseDecimals,
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
  if ("evm_native" === type) {
    const { balance } = await getEvmNativeBalance(
      networkName,
      address,
      blockHeight,
    );
    return balance;
  }

  if ("erc20" === type) {
    const { balance } = await getEvmAddressBalance(
      networkName,
      contract,
      address,
      blockHeight,
    );
    return balance;
  }

  if ("stellaswap_staking" === type) {
    const { balance } = await getStellaSwapAddressStaking(
      networkName,
      address,
      blockHeight,
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
  getBalanceFromNetwork,
};
