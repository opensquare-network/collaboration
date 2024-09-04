const { HttpError } = require("../../exc");
const proposalService = require("../../services/proposal.service");
const { isAddress } = require("@polkadot/util-crypto");
const {
  getDemocracyDelegated,
} = require("../../services/node.service/getDelegated");
const isEmpty = require("lodash.isempty");
const { findDelegationStrategies } = require("../../utils/delegation");
const { getProposalCollection } = require("../../mongo");

async function getVoterBalance(ctx) {
  const { proposalCid, network, address } = ctx.params;
  const { snapshot } = ctx.query;

  if (snapshot && !/^[0-9]*$/.test(snapshot)) {
    throw new HttpError(400, "Invalid snapshot number");
  }

  if (!isAddress(address)) {
    throw new HttpError(400, "Invalid address");
  }

  const balance = await proposalService.getVoterBalance(
    proposalCid,
    network,
    address,
    snapshot,
  );

  const proposalCol = await getProposalCollection();
  const proposal = await proposalCol.findOne({ cid: proposalCid });
  if (!proposal) {
    throw new HttpError(404, "Proposal does not exists");
  }

  const delegationStrategies = findDelegationStrategies(
    proposal.networksConfig,
    network,
  );
  let delegation;
  if (delegationStrategies.includes("democracy")) {
    const delegated = await getDemocracyDelegated(network, snapshot, address);
    if (!isEmpty(delegated)) {
      delegation = delegated;
    }
  }

  ctx.body = {
    ...balance,
    balanceOf: balance.balanceOf?.toString(),
    delegation,
  };
}

module.exports = {
  getVoterBalance,
};
