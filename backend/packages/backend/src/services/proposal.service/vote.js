const BigNumber = require("bignumber.js");
const { getProposalCollection, getVoteCollection } = require("../../mongo");
const { HttpError } = require("../../exc");
const { spaces: spaceServices } = require("../../spaces");
const { checkDelegation } = require("../../services/node.service");
const { toDecimal128 } = require("../../utils");
const { getBalanceFromNetwork } = require("../../services/node.service");
const { ChoiceType } = require("../../constants");
const { pinData } = require("./common");

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

  if (choices.some((choice) => !proposal.choices?.includes(choice))) {
    throw new HttpError(400, `Invalid choice: ${choice}`);
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

  if (realVoter && realVoter !== address) {
    const snapshotHeight = proposal.snapshotHeights?.[voterNetwork];
    await checkDelegation(voterNetwork, address, realVoter, snapshotHeight);
  }

  const voter = realVoter || address;

  const networkBalance = await getBalanceFromNetwork({
    networksConfig: proposal.networksConfig,
    networkName: voterNetwork,
    address: voter,
    blockHeight: proposal.snapshotHeights?.[voterNetwork],
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
  const result = await voteCol.findOneAndUpdate(
    {
      proposal: proposal._id,
      voter,
      voterNetwork,
    },
    {
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
    },
    {
      upsert: true,
      returnDocument: "after",
    },
  );

  if (!result.ok) {
    throw new HttpError(500, "Failed to create vote");
  }

  await proposalCol.updateOne(
    { cid: proposalCid },
    {
      $set: {
        lastActivityAt: new Date(),
      },
    },
  );

  return result.value?._id;
}

module.exports = {
  vote,
};
