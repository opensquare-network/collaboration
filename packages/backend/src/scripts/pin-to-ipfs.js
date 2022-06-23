const dotenv = require("dotenv");
dotenv.config();

const {
  getProposalCollection,
  getVoteCollection,
  getCommentCollection,
  getAppendantCollection,
} = require("../mongo");
const { pinCollectionDataToIpfs } = require("../services/ipfs.service");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function startPin() {
  const proposalCol = await getProposalCollection();
  const appendantCol = await getAppendantCollection();
  const voteCol = await getVoteCollection();
  const commentCol = await getCommentCollection();
  await Promise.all([
    pinCollectionDataToIpfs(proposalCol, "voting-proposal-"),
    pinCollectionDataToIpfs(appendantCol, "voting-appendant-"),
    pinCollectionDataToIpfs(voteCol, "voting-vote-"),
    pinCollectionDataToIpfs(commentCol, "voting-comment-"),
  ]);
}

async function main() {
  while (true) {
    try {
      await startPin();
      console.log(`Last pin at:`, new Date());
    } catch (e) {
      console.error(e);
    }

    await sleep(30 * 1000);
  }
}

main();
