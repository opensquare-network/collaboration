const dotenv = require("dotenv");
dotenv.config();

const { getCommentCollection } = require("../mongo");
const { pinCollectionDataToIpfs } = require("../services/ipfs.service");

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function startPin() {
  const commentCol = await getCommentCollection();
  await pinCollectionDataToIpfs(commentCol);
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
