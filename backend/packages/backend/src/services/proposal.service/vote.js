const BigNumber = require("bignumber.js");
const isEmpty = require("lodash.isempty");
const { getProposalCollection, getVoteCollection } = require("../../mongo");
const { HttpError } = require("../../exc");
const { spaces: spaceServices } = require("../../spaces");
const { checkDelegation } = require("../../services/node.service");
const { toDecimal128 } = require("../../utils");
const { getBalanceFromNetwork } = require("../../services/node.service");
const { ChoiceType } = require("../../constants");
const { pinData } = require("./common");
const { getBeenDelegated } = require("../node.service/getBeenDelegated");
const { adaptBalance } = require("../../utils/balance");
const { getDemocracyDelegated } = require("../node.service/getDelegated");
const { findDelegationStrategies } = require("../../utils/delegation");

async function addDelegatedVotes(
  bulk,
  {
    proposal,
    snapshotHeight,
    voter,
    voterNetwork,
    choices,
    remark,
    data,
    address,
    signature,
    cid,
    pinHash,
    now,
  },
) {
  const networksConfig = proposal.networksConfig;
  const delegationStrategies = findDelegationStrategies(
    networksConfig,
    voterNetwork,
  );

  if (!delegationStrategies.includes("democracy")) {
    return;
  }

  const baseSymbol = networksConfig?.symbol;
  const baseDecimals = networksConfig?.decimals;
  const networkCfg = networksConfig?.networks?.find(
    (n) => n.network === voterNetwork,
  );
  const asset = networkCfg?.assets?.find((asset) => asset.symbol === "CFG");

  const symbol = asset?.symbol ?? networkCfg?.symbol ?? baseSymbol;
  const decimals = asset?.decimals ?? networkCfg?.decimals ?? baseDecimals;
  const multiplier = asset?.multiplier ?? networkCfg?.multiplier ?? 1;

  const beenDelegated = await getBeenDelegated(
    voterNetwork,
    snapshotHeight,
    voter,
  );

  for (const { delegator, balance } of beenDelegated) {
    const detail = {
      symbol,
      decimals,
      balance,
      multiplier,
    };

    const balanceOf =
      adaptBalance(balance, decimals, baseDecimals) * multiplier;

    bulk
      .find({
        proposal: proposal._id,
        voter: delegator,
        voterNetwork,
      })
      .upsert()
      .updateOne({
        $set: {
          choices,
          remark,
          data,
          address,
          signature,
          updatedAt: now,
          cid,
          pinHash,
          weights: {
            balanceOf: toDecimal128(balanceOf),
            details: [detail],
          },
          // Version 2: multiple network space support
          // Version 3: multiple choices support
          // Version 4: multi-assets network
          version: "4",
          isDelegate: true,
          delegatee: voter,
        },
        $setOnInsert: {
          createdAt: now,
        },
      });
  }

  // Clean old votes
  bulk
    .find({
      proposal: proposal._id,
      isDelegate: true,
      delegatee: voter,
      voterNetwork,
      updatedAt: { $ne: now },
    })
    .delete();
}

async function vote(
  proposalCid,
  choices,
  remark,
  realVoter,
  data,
  address,
  voterNetwork,
  signature,
) {
  const proposalCol = await getProposalCollection();
  const proposal = await proposalCol.findOne({ cid: proposalCid });
  if (!proposal) {
    throw new HttpError(400, "Proposal not found.");
  }

  if (proposal.choiceType === ChoiceType.Single && choices.length !== 1) {
    throw new HttpError(400, "Can vote single choice only");
  }

  for (const choice of choices) {
    if (!proposal.choices?.includes(choice)) {
      throw new HttpError(400, `Invalid choice: ${choice}`);
    }
  }

  const now = new Date();

  if (proposal.startDate > now.getTime()) {
    throw new HttpError(400, "The voting is not started yet");
  }

  if (proposal.endDate < now.getTime()) {
    throw new HttpError(400, "The voting had already ended");
  }

  const space = proposal.space;
  const spaceService = spaceServices[space];
  if (!spaceService) {
    throw new HttpError(500, "Unknown space");
  }

  const snapshotNetworks = Object.keys(proposal.snapshotHeights);
  if (!snapshotNetworks.includes(voterNetwork)) {
    throw new HttpError(400, "Voter network is not supported by this proposal");
  }

  const snapshotHeight = proposal.snapshotHeights?.[voterNetwork];
  if (realVoter && realVoter !== address) {
    await checkDelegation(voterNetwork, address, realVoter, snapshotHeight);
  }

  const voter = realVoter || address;

  const delegationStrategies = findDelegationStrategies(
    proposal.networksConfig,
    voterNetwork,
  );
  if (delegationStrategies.includes("democracy")) {
    const delegation = await getDemocracyDelegated(
      voterNetwork,
      snapshotHeight,
      voter,
    );
    if (!isEmpty(delegation)) {
      throw new HttpError(
        400,
        "You can't vote because you have delegated your votes",
      );
    }
  }

  const networkBalance = await getBalanceFromNetwork({
    networksConfig: proposal.networksConfig,
    networkName: voterNetwork,
    address: voter,
    blockHeight: snapshotHeight,
  });

  const balanceOf = networkBalance?.balanceOf;
  const networkBalanceDetails = networkBalance?.details;

  if (new BigNumber(balanceOf).lt(spaceService.voteThreshold)) {
    const symbolVoteThreshold = new BigNumber(spaceService.voteThreshold)
      .div(Math.pow(10, proposal.networksConfig.decimals))
      .toString();
    throw new HttpError(
      400,
      `Require the minimum of ${symbolVoteThreshold} ${proposal.networksConfig.symbol} to vote`,
    );
  }
  const { cid, pinHash } = await pinData(data, address, signature);

  const voteCol = await getVoteCollection();
  const bulk = voteCol.initializeOrderedBulkOp();

  bulk
    .find({
      proposal: proposal._id,
      voter,
      voterNetwork,
    })
    .upsert()
    .updateOne({
      $set: {
        choices,
        remark,
        data,
        address,
        signature,
        updatedAt: now,
        cid,
        pinHash,
        weights: {
          balanceOf: toDecimal128(balanceOf),
          details: networkBalanceDetails,
        },
        // Version 2: multiple network space support
        // Version 3: multiple choices support
        // Version 4: multi-assets network
        version: "4",
      },
      $setOnInsert: {
        createdAt: now,
      },
    });

  await addDelegatedVotes(bulk, {
    proposal,
    snapshotHeight,
    voter,
    voterNetwork,
    choices,
    remark,
    data,
    address,
    signature,
    cid,
    pinHash,
    now,
  });

  await bulk.execute();

  await proposalCol.updateOne(
    { cid: proposalCid },
    {
      $set: {
        lastActivityAt: new Date(),
      },
    },
  );

  return {
    success: true,
  };
}

module.exports = {
  vote,
};
