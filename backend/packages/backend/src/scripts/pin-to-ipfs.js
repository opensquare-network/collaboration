const dotenv = require("dotenv");
dotenv.config();

const {
  getProposalCollection,
  getVoteCollection,
  getCommentCollection,
  getAppendantCollection,
} = require("../mongo");
const { pinCollectionDataToIpfs } = require("../services/ipfs.service");

async function startPin() {
  const proposalCol = await getProposalCollection();
  const appendantCol = await getAppendantCollection();
  const voteCol = await getVoteCollection();
  const commentCol = await getCommentCollection();
  await Promise.all([
    pinCollectionDataToIpfs(proposalCol),
    pinCollectionDataToIpfs(appendantCol),
    pinCollectionDataToIpfs(voteCol),
    pinCollectionDataToIpfs(commentCol),
  ]);
}

async function main() {
  try {
    await startPin();
    console.log(`Last pin at:`, new Date());
    process.exit(0);
  } catch (e) {
    console.error(e);
  }
}

main();
