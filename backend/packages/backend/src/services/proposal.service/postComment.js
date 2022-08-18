const { safeHtml } = require("../../utils/post");
const { getProposalCollection, getCommentCollection } = require("../../mongo");
const { HttpError } = require("../../exc");
const { ContentType } = require("../../constants");

async function postComment(
  proposalCid,
  content,
  contentType,
  commenterNetwork,
  data,
  address,
  signature
) {
  const proposalCol = await getProposalCollection();
  const proposal = await proposalCol.findOne({ cid: proposalCid });
  if (!proposal) {
    throw new HttpError(400, "Proposal not found.");
  }

  const snapshotNetworks = Object.keys(proposal.snapshotHeights);
  if (!snapshotNetworks.includes(commenterNetwork)) {
    throw new HttpError(
      400,
      "Commenter network is not supported by this proposal"
    );
  }

  const { cid, pinHash } = await pinData(data, address, signature);

  const commentCol = await getCommentCollection();
  const height = await commentCol.countDocuments({ proposal: proposal._id });

  const now = new Date();

  const newComment = {
    proposal: proposal._id,
    content: contentType === ContentType.Html ? safeHtml(content) : content,
    contentType,
    commenterNetwork,
    data,
    address,
    signature,
    height: height + 1,
    createdAt: now,
    updatedAt: now,
    cid,
    pinHash,
  };
  const result = await commentCol.insertOne(newComment);

  if (!result.insertedId) {
    throw new HttpError(500, "Failed to create comment");
  }

  const newCommentId = result.insertedId;

  await proposalCol.updateOne(
    { cid: proposalCid },
    {
      $set: {
        lastActivityAt: new Date(),
      },
    }
  );

  return newCommentId;
}

module.exports = {
  postComment,
};
