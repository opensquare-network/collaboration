require("dotenv").config();

const minimist = require("minimist");
const {
  getSpaceCollection,
  getProposalCollection,
  getVoteCollection,
  getCommentCollection,
} = require("../mongo");

function getSpaceId() {
  const args = minimist(process.argv.slice(2));
  if (!args.space) {
    throw new Error("Must specify space id with argument --space=[spaceId]");
  }
  return args.space;
}

async function deleteSpace(spaceId) {
  const spaceCol = await getSpaceCollection();
  const space = await spaceCol.findOne({ id: spaceId });
  if (!space) {
    throw new Error(`Space with id "${spaceId}" not found.`);
  }

  await spaceCol.deleteOne({ id: spaceId });
}

async function getProposalIds(spaceId) {
  const proposalCol = await getProposalCollection();
  const proposals = await proposalCol.find({ space: spaceId }).toArray();
  const proposalIds = proposals?.map((p) => p._id);

  return proposalIds || [];
}

async function deleteVotes(proposalIds) {
  const voteCol = await getVoteCollection();
  await voteCol.deleteMany({
    proposal: { $in: proposalIds },
  });
}

async function deleteComments(proposalIds) {
  const commentCol = await getCommentCollection();
  await commentCol.deleteMany({
    proposal: { $in: proposalIds },
  });
}

async function deleteProposals(spaceId) {
  const proposalCol = await getProposalCollection();
  await proposalCol.deleteMany({
    space: spaceId,
  });
}

async function main() {
  const spaceId = getSpaceId();
  await deleteSpace(spaceId);

  const proposalIds = await getProposalIds(spaceId);
  if (proposalIds.length > 0) {
    await deleteComments(proposalIds);
    await deleteVotes(proposalIds);
  }

  await deleteProposals(spaceId);

  console.log(`Deleted space ${spaceId} and related data successfully`);
}

main()
  .catch(console.error)
  .finally(() => {
    process.exit();
  });
