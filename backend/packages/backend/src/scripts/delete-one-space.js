require("dotenv").config();

const minimist = require("minimist");
const {
  getSpaceCollection,
  getProposalCollection,
  getVoteCollection,
  getCommentCollection,
} = require("../mongo");
const { logger } = require("../utils/logger");

function validateArgs(args) {
  if (!args.space) {
    console.error("Must specify space id with argument --space=[spaceId]");
    return null;
  }
  return args.space;
}

async function getCollections() {
  const spaceCol = await getSpaceCollection();
  const proposalCol = await getProposalCollection();
  const voteCol = await getVoteCollection();
  const commentCol = await getCommentCollection();

  return { spaceCol, proposalCol, voteCol, commentCol };
}

async function validateSpace(spaceCol, spaceId) {
  const space = await spaceCol.findOne({ id: spaceId });
  if (!space) {
    console.error(`Space with id "${spaceId}" not found.`);
    return null;
  }
  return space;
}

async function getProposalsForSpace(proposalCol, spaceId) {
  const proposals = await proposalCol.find({ space: spaceId }).toArray();
  const proposalIds = proposals.map((p) => p._id);

  console.log(`Found ${proposals.length} proposals to delete`);

  return { proposals, proposalIds };
}

async function deleteVotesAndComments(voteCol, commentCol, proposalIds) {
  if (proposalIds.length === 0) {
    return { votesDeleted: 0, commentsDeleted: 0 };
  }

  const voteDeleteResult = await voteCol.deleteMany({
    proposal: { $in: proposalIds },
  });
  console.log(`Deleted ${voteDeleteResult.deletedCount} votes`);

  const commentDeleteResult = await commentCol.deleteMany({
    proposal: { $in: proposalIds },
  });
  console.log(`Deleted ${commentDeleteResult.deletedCount} comments`);

  return {
    votesDeleted: voteDeleteResult.deletedCount,
    commentsDeleted: commentDeleteResult.deletedCount,
  };
}

async function deleteProposals(proposalCol, spaceId) {
  const proposalDeleteResult = await proposalCol.deleteMany({
    space: spaceId,
  });
  console.log(`Deleted ${proposalDeleteResult.deletedCount} proposals`);

  return proposalDeleteResult.deletedCount;
}

async function deleteSpace(spaceCol, spaceId) {
  const spaceDeleteResult = await spaceCol.deleteOne({ id: spaceId });
  return spaceDeleteResult.deletedCount > 0;
}

function logDeleteResult(spaceId, success, proposalCount, proposalIds) {
  if (success) {
    console.log(
      `Successfully deleted space "${spaceId}" and all associated data`,
    );
    logger.info(
      `[Success] Deleted space "${spaceId}" with ${proposalCount} proposals, ${
        proposalIds.length > 0 ? "votes and comments" : "no votes or comments"
      }`,
    );
  } else {
    console.error(`Failed to delete space "${spaceId}"`);
    logger.error(`[Error] Failed to delete space "${spaceId}"`);
  }
}

async function executeDelete(spaceId) {
  const { spaceCol, proposalCol, voteCol, commentCol } = await getCollections();

  const space = await validateSpace(spaceCol, spaceId);
  if (!space) {
    return;
  }

  const { proposals, proposalIds } = await getProposalsForSpace(
    proposalCol,
    spaceId,
  );

  await deleteVotesAndComments(voteCol, commentCol, proposalIds);

  await deleteProposals(proposalCol, spaceId);

  const success = await deleteSpace(spaceCol, spaceId);

  logDeleteResult(spaceId, success, proposals.length, proposalIds);
}

async function main() {
  const args = minimist(process.argv.slice(2));

  const spaceId = validateArgs(args);
  if (!spaceId) {
    return;
  }

  console.log(`Starting deletion process for space: ${spaceId}`);

  try {
    await executeDelete(spaceId);
  } catch (error) {
    console.error(`Error during deletion process:`, error);
    logger.error(
      `[Error] Failed to delete space "${spaceId}": ${error.message}`,
    );
  }
}

main()
  .catch(console.error)
  .finally(() => {
    process.exit();
  });
