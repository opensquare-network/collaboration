const { evmNetworks } = require("../../consts/networks");
const { HttpError } = require("../../exc");
const { getLatestHeight } = require("../../services/chain.service");
const { spaces: spaceServices } = require("../../spaces");
const { isAddress: isSubstrateAddress } = require("@polkadot/util-crypto");
const { getBalanceFromNetwork } = require("../../services/node.service");
const ethers = require("ethers");
const {
  getDemocracyDelegated,
} = require("../../services/node.service/getDelegated");
const isEmpty = require("lodash.isempty");
const { findDelegationStrategies } = require("../../utils/delegation");

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
  const blockHeight = snapshot
    ? parseInt(snapshot)
    : await getLatestHeight(network);

  const totalBalance = await getBalanceFromNetwork({
    networksConfig: spaceService,
    networkName: network,
    address,
    blockHeight,
  });

  const delegationStrategies = findDelegationStrategies(spaceService, network);

  let delegation;
  if (delegationStrategies.includes("democracy")) {
    const delegated = await getDemocracyDelegated(
      network,
      blockHeight,
      address,
    );
    if (!isEmpty(delegated)) {
      delegation = delegated;
    }
  }

  ctx.body = {
    balance: totalBalance?.balanceOf,
    details: totalBalance?.details,
    delegation,
  };
}

module.exports = {
  getSpaceAccountBalance,
};
