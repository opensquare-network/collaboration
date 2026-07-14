const dotenv = require("dotenv");
dotenv.config();

const {
  getProposalCollection,
  getVoteCollection,
  getCommentCollection,
  getAppendantCollection,
} = require("../mongo");
const { pinCollectionDataToS3 } = require("../services/s3.service/pin");

async function startPin() {
  const proposalCol = await getProposalCollection();
  const appendantCol = await getAppendantCollection();
  const voteCol = await getVoteCollection();
  const commentCol = await getCommentCollection();
  await Promise.all([
    pinCollectionDataToS3(proposalCol),
    pinCollectionDataToS3(appendantCol),
    pinCollectionDataToS3(voteCol),
    pinCollectionDataToS3(commentCol),
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
