const dotenv = require("dotenv");
dotenv.config();

const {
  getProposalCollection,
  getVoteCollection,
  getCommentCollection,
  getAppendantCollection,
} = require("../mongo");
const { saveCollectionDataToS3 } = require("../services/s3.service/saveToS3");

async function startPin() {
  const proposalCol = await getProposalCollection();
  const appendantCol = await getAppendantCollection();
  const voteCol = await getVoteCollection();
  const commentCol = await getCommentCollection();
  await Promise.all([
    saveCollectionDataToS3(proposalCol),
    saveCollectionDataToS3(appendantCol),
    saveCollectionDataToS3(voteCol),
    saveCollectionDataToS3(commentCol),
  ]);
}

async function main() {
  try {
    await startPin();
    console.log("Last pin at:", new Date());
    process.exit(0);
  } catch (e) {
    console.error(e);
  }
}

main();
