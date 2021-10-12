const dotenv = require("dotenv");
dotenv.config();

const { getVoteCollection } = require("../mongo");
const { pinCollectionDataToIpfs } = require("../services/ipfs.service");

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function startPin() {
  const voteCol = await getVoteCollection();
  await pinCollectionDataToIpfs(voteCol);
}

async function main() {
  while (true) {
    try {
      await startPin();
      console.log(`Last pin at:`, new Date());
    } catch (e) {
      console.error(e);
    }

    await sleep(30*1000);
  }
}

main();
