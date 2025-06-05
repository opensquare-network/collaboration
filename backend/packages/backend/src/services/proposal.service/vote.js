const BigNumber = require("bignumber.js");
const isEmpty = require("lodash.isempty");
const pick = require("lodash.pick");
const {
  getProposalCollection,
  getVoteCollection,
  getSpaceCollection,
} = require("../../mongo");
const { HttpError } = require("../../exc");
const { checkProxy: _checkProxy } = require("../../services/node.service");
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
  hasOnePersonOneVoteStrategy,
} = require("../../utils/strategy");
const { isSameAddress, normalizeAddress } = require("../../utils/address");

async function getDelegatorBalances({ proposal, voter, voterNetwork }) {
  const snapshotHeight = proposal.snapshotHeights?.[voterNetwork];

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

async function checkProxy({ proposal, voterNetwork, address, realVoter }) {
  if (!realVoter || isSameAddress(realVoter, address)) {
    return;
  }

  const snapshotHeight = proposal.snapshotHeights?.[voterNetwork];
  await _checkProxy(voterNetwork, address, realVoter, snapshotHeight);
}

async function checkVoterDelegation({ proposal, voterNetwork, voter }) {
  const snapshotHeight = proposal.snapshotHeights?.[voterNetwork];

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

async function checkSocietyVote({ proposal, voterNetwork, voter }) {
  const snapshotHeight = proposal.snapshotHeights?.[voterNetwork];

  const societyMember = await getSocietyMember(
    voterNetwork,
    voter,
    snapshotHeight,
  );
  if (!societyMember.data) {
    throw new HttpError(400, "You are not the society member");
  }
}

async function checkWhitelistMember(networksConfig, address) {
  if (
    (networksConfig.whitelist || []).findIndex((item) =>
      isSameAddress(item, address),
    ) === -1
  ) {
    throw new HttpError(400, "Only members can vote on this proposal");
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

async function getWeights({ proposal, voterNetwork, voter }) {
  const weights = {};

  const snapshotHeight = proposal.snapshotHeights?.[voterNetwork];

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

  if (hasOnePersonOneVoteStrategy(proposal)) {
    weights.onePersonOneVote = 1;
  }

  return weights;
}

async function saveVote({
  data,
  address,
  signature,
  delegators,
  proposal,
  voter,
  voterNetwork,
  choices,
  remark,
  now,
  weights,
  proposalCol,
  proposalCid,
}) {
  const { cid, pinHash } = await pinData({
    data,
    address,
    signature,
    delegators,
  });

  const voteCol = await getVoteCollection();

  // Remove existing duplicate votes with same address in different ss58 format
  const normalizedVoterAddress = normalizeAddress(voter);
  const existingVotes = await voteCol
    .find({
      proposal: proposal._id,
      voter: { $in: [voter, normalizedVoterAddress] },
      voterNetwork,
    })
    .sort({ updatedAt: 1 })
    .toArray();

  if (existingVotes.length > 1) {
    // Delete duplicates and keep the latest vote
    existingVotes.pop();
    for (const vote of existingVotes) {
      await voteCol.deleteOne({ _id: vote._id });
    }
  }

  const bulk = voteCol.initializeOrderedBulkOp();

  bulk
    .find({
      proposal: proposal._id,
      voter: { $in: [voter, normalizedVoterAddress] },
      voterNetwork,
    })
    .upsert()
    .updateOne({
      $set: {
        voter,
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
        lastActivityAt: now,
      },
    },
  );
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
  const voter = realVoter || address;

  const proposalCol = await getProposalCollection();
  const proposal = await proposalCol.findOne({ cid: proposalCid });
  if (!proposal) {
    throw new HttpError(400, "Proposal not found.");
  }

  if (proposal.networksConfig.accessibility === Accessibility.SOCIETY) {
    await checkSocietyVote({
      proposal,
      voterNetwork,
      voter,
    });
  }

  if (proposal.networksConfig.accessibility === Accessibility.WHITELIST) {
    await checkWhitelistMember(proposal.networksConfig, voter);
  }

  const now = new Date();

  await checkProxy({ proposal, voterNetwork, address, realVoter });

  await checkVoterDelegation({
    proposal,
    voterNetwork,
    voter,
  });

  const weights = await getWeights({
    proposal,
    voterNetwork,
    voter,
  });

  const delegators = await getDelegatorBalances({
    proposal,
    voterNetwork,
    voter,
  });

  await saveVote({
    data,
    address,
    signature,
    delegators,
    proposal,
    voter,
    voterNetwork,
    choices,
    remark,
    now,
    weights,
    proposalCol,
    proposalCid,
  });

  return {
    success: true,
  };
}

module.exports = {
  vote,
};
