const { getProposalCollection } = require("../../mongo");
const { HttpError } = require("../../exc");
const { isSameAddress } = require("../../utils/address");

async function terminate(
  proposalCid,
  terminatorNetwork,
  data,
  address,
  signature,
) {
  const proposalCol = await getProposalCollection();
  const proposal = await proposalCol.findOne({ cid: proposalCid });
  if (!proposal) {
    throw new HttpError(400, "Proposal not found.");
  }

  const now = Date.now();

  if (proposal.endDate < now) {
    throw new HttpError(400, "The voting had already ended");
  }

  if (
    !isSameAddress(address, proposal.proposer) &&
    !isSameAddress(address, proposal.address)
  ) {
    throw new HttpError(400, "Only the proposer can terminate the proposal");
  }

  await proposalCol.updateOne(
    { _id: proposal._id },
    {
      $set: {
        terminated: {
          data,
          address,
          signature,
          terminatorNetwork,
          terminatedAt: now,
        },
      },
    },
  );

  return {
    result: true,
  };
}

module.exports = {
  terminate,
};
