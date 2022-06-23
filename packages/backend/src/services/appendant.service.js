const { getProposalCollection, getAppendantCollection } = require("../mongo");
const { isSamePublicKey } = require("../utils");
const { pinData } = require("./proposal.service/common");

async function addAppendant(
  proposalCid,
  content,
  contentType,
  appenderNetwork,
  data,
  address,
  signature
) {
  const proposalCol = await getProposalCollection();
  const proposal = await proposalCol.findOne({ cid: proposalCid });
  if (!proposal) {
    throw new HttpError(400, "Proposal not found.");
  }

  const now = Date.now();

  if (
    !isSamePublicKey(address, proposal.proposer) &&
    !isSamePublicKey(address, proposal.address)
  ) {
    throw new HttpError(400, "Only the proposer can append");
  }

  const { cid, pinHash } = await pinData(
    data,
    address,
    signature,
    "voting-appendant-"
  );

  const appendantCol = await getAppendantCollection();
  await appendantCol.insertOne({
    proposal: proposal._id,
    content,
    contentType,
    appenderNetwork,
    appender: address,
    data,
    address,
    signature,
    cid,
    pinHash,
    createdAt: now,
  });

  return {
    cid,
  };
}

module.exports = {
  addAppendant,
};
