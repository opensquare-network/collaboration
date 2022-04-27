const { evmNetworks } = require("../../consts/networks");
const { HttpError } = require("../../exc");
const { getLatestHeight } = require("../../services/chain.service");
const { spaces: spaceServices } = require("../../spaces");
const { isAddress: isSubstrateAddress } = require("@polkadot/util-crypto");
const { getBalanceFromNetwork } = require("../../services/node.service");
const ethers = require("ethers");
const { adaptBalance } = require("../../utils/balance");
const { getEvmAddressBalance } = require("../../services/node.service");

async function getSpaceAccountBalance(ctx) {
  const { space, network, address } = ctx.params;
  const { snapshot } = ctx.query;

  if (snapshot && !/^[0-9]*$/.test(snapshot)) {
    throw new HttpError(400, "Invalid snapshot number");
  }

  const isEvm = evmNetworks.includes(network);

  if (
    (isEvm && !ethers.utils.isAddress(address)) ||
    !isSubstrateAddress(address)
  ) {
    throw new HttpError(400, "Invalid address");
  }

  const spaceService = spaceServices[space];
  const blockHeight = snapshot ? parseInt(snapshot) : getLatestHeight(network);

  if (isEvm) {
    const networkConfig = spaceService.networks.find(
      ({ network: n }) => n === network
    );
    ctx.body = await getEvmAddressBalance(
      networkConfig,
      networkConfig.contract,
      address,
      blockHeight,
      spaceService.decimals
    );
    return;
  }

  const totalBalance = await getBalanceFromNetwork({
    networksConfig: spaceService,
    networkName: network,
    address,
    blockHeight,
    spaceDecimals: spaceService?.decimals,
  });
  ctx.body = {
    balance: totalBalance,
  };
}

module.exports = {
  getSpaceAccountBalance,
};
