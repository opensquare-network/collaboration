/*eslint no-constant-condition: ["error", { "checkLoops": false }]*/
const dotenv = require("dotenv");
dotenv.config();

const {
  getProposalCollection,
  getVoteCollection,
  getCommentCollection,
  getAppendantCollection,
} = require("../mongo");
const { repinCollectionDataToS3 } = require("../services/s3.service/pin");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function startPin() {
  const proposalCol = await getProposalCollection();
  const appendantCol = await getAppendantCollection();
  const voteCol = await getVoteCollection();
  const commentCol = await getCommentCollection();
  await Promise.all([
    repinCollectionDataToS3(proposalCol),
    repinCollectionDataToS3(appendantCol),
    repinCollectionDataToS3(voteCol),
    repinCollectionDataToS3(commentCol),
  ]);
}

async function main() {
  while (true) {
    try {
      await startPin();
      console.log("Last pin at:", new Date());
    } catch (e) {
      console.error(e);
    }

    await sleep(30 * 1000);
  }
}

main();
