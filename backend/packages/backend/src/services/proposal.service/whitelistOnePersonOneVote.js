const { getProposalCollection, getVoteCollection } = require("../../mongo");
const { HttpError } = require("../../exc");
const { pinData } = require("./common");
const { isSameAddress } = require("../../utils/address");

async function checkWhitelistMember(networksConfig, address) {
  if (
    (networksConfig.whitelist || []).findIndex((item) =>
      isSameAddress(item, address),
    ) === -1
  ) {
    throw new HttpError(400, "Only members can vote on this proposal");
  }
}

async function saveVote({
  data,
  address,
  signature,
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
  });

  const voteCol = await getVoteCollection();

  voteCol.updateOne(
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
        weights,
        // Version 2: multiple network space support
        // Version 3: multiple choices support
        // Version 4: multi-assets network
        version: "4",
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
}

async function vote(
  proposalCid,
  choices,
  remark,
  data,
  address,
  voterNetwork,
  signature,
) {
  const voter = address;

  const proposalCol = await getProposalCollection();
  const proposal = await proposalCol.findOne({ cid: proposalCid });
  if (!proposal) {
    throw new HttpError(400, "Proposal not found.");
  }

  await checkWhitelistMember(proposal.networksConfig, voter);

  const now = new Date();

  const weights = { onePersonOneVote: 1 };

  await saveVote({
    data,
    address,
    signature,
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
