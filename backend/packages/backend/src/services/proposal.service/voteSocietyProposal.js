const { getProposalCollection, getVoteCollection } = require("../../mongo");
const { HttpError } = require("../../exc");
const { toDecimal128 } = require("../../utils");
const { pinData } = require("./common");
const { getSocietyMember } = require("../node.service/getSocietyMember");

async function checkCanVote({ proposal, voterNetwork, address, realVoter }) {
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

async function voteSocietyProposal(
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

  const now = new Date();

  await checkCanVote({ proposal, voterNetwork, address, realVoter });

  const voter = realVoter || address;

  const { cid, pinHash } = await pinData({
    data,
    address,
    signature,
  });

  const voteCol = await getVoteCollection();

  await voteCol.updateOne(
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
          balanceOf: toDecimal128("0"),
          details: [],
        },
        // Version 2: multiple network space support
        // Version 3: multiple choices support
        // Version 4: multi-assets network
        version: "4",
        // delegators,
      },
      $setOnInsert: {
        createdAt: now,
      },
    },
    { upsert: true },
  );

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
  voteSocietyProposal,
};
