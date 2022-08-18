const { getProposalCollection, getCommentCollection } = require("../../mongo");
const { HttpError } = require("../../exc");

async function getComments(proposalCid, page, pageSize) {
  const proposalCol = await getProposalCollection();
  const proposal = await proposalCol.findOne({ cid: proposalCid });
  if (!proposal) {
    throw new HttpError(404, "Proposal does not exists");
  }
  const q = { proposal: proposal?._id };

  const commentCol = await getCommentCollection();
  const total = await commentCol.count(q);

  if (page === "last") {
    const totalPages = Math.ceil(total / pageSize);
    page = Math.max(totalPages, 1);
  }

  const comments = await commentCol
    .find(q)
    .sort({ createdAt: 1 })
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .toArray();

  return {
    items: comments,
    total,
    page,
    pageSize,
  };
}

module.exports = {
  getComments,
};
