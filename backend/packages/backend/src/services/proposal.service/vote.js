const BigNumber = require("bignumber.js");
const isEmpty = require("lodash.isempty");
const pick = require("lodash.pick");
const {
  getProposalCollection,
  getVoteCollection,
  getSpaceCollection,
} = require("../../mongo");
const { HttpError } = require("../../exc");
const { checkDelegation } = require("../../services/node.service");
const { toDecimal128 } = require("../../utils");
const { getBalanceFromNetwork } = require("../../services/node.service");
const { pinData } = require("./common");
const { getBeenDelegated } = require("../node.service/getBeenDelegated");
const { adaptBalance } = require("../../utils/balance");
const { getDemocracyDelegated } = require("../node.service/getDelegated");
const { findDelegationStrategies } = require("../../utils/delegation");
const { getSocietyMember } = require("../node.service/getSocietyMember");
const { Accessibility } = require("../../consts/space");
const {
  hasBalanceStrategy,
  hasSocietyStrategy,
} = require("../../utils/strategy");

async function getDelegatorBalances({
  proposal,
  snapshotHeight,
  voter,
  voterNetwork,
}) {
  const networksConfig = proposal.networksConfig;
  const networkCfg = networksConfig?.networks?.find(
    (n) => n.network === voterNetwork,
  );

  const asset = networkCfg?.assets?.find((asset) => asset.isNative);

  if (asset?.delegation !== "democracy") {
    return;
  }

  const beenDelegated = await getBeenDelegated(
    voterNetwork,
    snapshotHeight,
    voter,
  );

  if (beenDelegated.length === 0) {
    return;
  }

  return beenDelegated.map((item) => pick(item, ["delegator", "balance"]));
}

async function addDelegatedVotes(
  bulk,
  {
    delegators,
    proposal,
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
  if (!delegators || delegators?.length === 0) {
    return;
  }

  const networksConfig = proposal.networksConfig;
  const baseSymbol = networksConfig?.symbol;
  const baseDecimals = networksConfig?.decimals;
  const networkCfg = networksConfig?.networks?.find(
    (n) => n.network === voterNetwork,
  );

  const asset = networkCfg?.assets?.find((asset) => asset.isNative);

  if (asset?.delegation !== "democracy") {
    return;
  }

  const symbol = asset?.symbol ?? baseSymbol;
  const decimals = asset?.decimals ?? baseDecimals;
  const multiplier = asset?.multiplier ?? 1;

  for (const { delegator, balance } of delegators) {
    const detail = {
      symbol,
      decimals,
      balance,
      multiplier,
    };

    const balanceOf = adaptBalance(balance, decimals, baseDecimals).times(
      multiplier,
    );

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
          delegators,
        },
        $setOnInsert: {
          createdAt: now,
        },
      });
  }
}

async function checkVoterDelegation({
  proposal,
  voterNetwork,
  address,
  realVoter,
}) {
  const snapshotHeight = proposal.snapshotHeights?.[voterNetwork];
  const voter = realVoter || address;

  if (realVoter && realVoter !== address) {
    await checkDelegation(voterNetwork, address, realVoter, snapshotHeight);
  }

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
}

async function checkVoteThreshold({
  networkBalanceDetails,
  proposal,
  voterNetwork,
}) {
  let networksConfig = null;

  if (proposal.networksConfig?.version === "4") {
    networksConfig = proposal.networksConfig;
  } else {
    const spaceCol = await getSpaceCollection();
    const spaceConfig = await spaceCol.findOne({ id: proposal.space });
    networksConfig = spaceConfig;
  }

  const networkConfig = networksConfig?.networks?.find(
    (item) => item.network === voterNetwork,
  );
  if (networkConfig?.assets) {
    const passThreshold = networkConfig?.assets?.some((item) =>
      networkBalanceDetails?.some((balance) =>
        new BigNumber(item.votingThreshold || 0).lte(balance.balance),
      ),
    );

    if (!passThreshold) {
      throw new HttpError(400, "You don't have enough balance to vote");
    }
  }
}

async function checkSocietyVote({
  proposal,
  voterNetwork,
  address,
  realVoter,
}) {
  if (proposal.networksConfig.accessibility !== Accessibility.SOCIETY) {
    return;
  }

  const snapshotHeight = proposal.snapshotHeights?.[voterNetwork];
  const voter = realVoter || address;

  const societyMember = await getSocietyMember(
    voterNetwork,
    voter,
    snapshotHeight,
  );
  if (!societyMember.data) {
    throw new HttpError(400, "You are not the society member");
  }
}

async function getSocietyVote({ voterNetwork, voter, snapshotHeight }) {
  const societyMember = await getSocietyMember(
    voterNetwork,
    voter,
    snapshotHeight,
  );
  if (societyMember.data) {
    const rank = societyMember.data.rank;
    if (rank === 1) {
      return 4;
    }
    return 1;
  }
  return 0;
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

  await checkSocietyVote({
    proposal,
    voterNetwork,
    address,
    realVoter,
  });

  const now = new Date();

  await checkVoterDelegation({
    proposal,
    voterNetwork,
    address,
    realVoter,
  });

  const snapshotHeight = proposal.snapshotHeights?.[voterNetwork];
  const voter = realVoter || address;

  const weights = {};

  if (hasBalanceStrategy(proposal)) {
    const networkBalance = await getBalanceFromNetwork({
      networksConfig: proposal.networksConfig,
      networkName: voterNetwork,
      address: voter,
      blockHeight: snapshotHeight,
    });

    const balanceOf = networkBalance?.balanceOf;
    const networkBalanceDetails = networkBalance?.details;

    await checkVoteThreshold({ networkBalanceDetails, proposal, voterNetwork });

    weights.balanceOf = toDecimal128(balanceOf);
    weights.details = networkBalanceDetails;
  }

  if (hasSocietyStrategy(proposal)) {
    weights.societyVote = await getSocietyVote({
      voterNetwork,
      voter,
      snapshotHeight,
    });
  }

  const delegators = await getDelegatorBalances({
    proposal,
    snapshotHeight,
    voter,
    voterNetwork,
  });

  const { cid, pinHash } = await pinData({
    data,
    address,
    signature,
    delegators,
  });

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
        weights,
        // Version 2: multiple network space support
        // Version 3: multiple choices support
        // Version 4: multi-assets network
        version: "4",
        delegators,
      },
      $setOnInsert: {
        createdAt: now,
      },
    });

  await addDelegatedVotes(bulk, {
    delegators,
    proposal,
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

  // Clean old delegate votes
  bulk
    .find({
      proposal: proposal._id,
      isDelegate: true,
      delegatee: voter,
      voterNetwork,
      updatedAt: { $ne: now },
    })
    .delete();

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
