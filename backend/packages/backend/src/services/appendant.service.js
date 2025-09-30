const { NotificationType } = require("../constants");
const { HttpError } = require("../exc");
const { getProposalCollection, getAppendantCollection } = require("../mongo");
const { isSameAddress } = require("../utils/address");
const { createMentionNotification } = require("./notification");
const { pinData } = require("./proposal.service/common");

async function addAppendant(
  proposalCid,
  content,
  contentType,
  appenderNetwork,
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

  if (
    !isSameAddress(address, proposal.proposer) &&
    !isSameAddress(address, proposal.address)
  ) {
    throw new HttpError(400, "Only the proposer can append");
  }

  const { cid, pinHash } = await pinData({ data, address, signature });

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

  await createMentionNotification(
    NotificationType.AppendantMentionUser,
    content,
    contentType,
    proposal.space,
    proposalCid,
  );

  return {
    cid,
  };
}

module.exports = {
  addAppendant,
};
