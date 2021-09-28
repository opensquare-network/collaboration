const dotenv = require("dotenv");
dotenv.config();

const { getCommentCollection } = require("../mongo");
const ipfsService = require("../services/ipfs.service");

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function startPin() {
  const commentCol = await getCommentCollection();
  const comments = await commentCol.find({ pinHash: null }).toArray();
  for (const comment of comments) {
    let pinHash = undefined;

    try {
      const msg = JSON.stringify(comment.data);
      const pinResult = await ipfsService.pinJsonToIpfs({
        msg,
        address: comment.address,
        signature: comment.signature,
        version: "1",
      });
      pinHash = pinResult.PinHash;
      console.log(`Pin hash: ${pinHash}`);
    } catch (e) {
      console.error(e);
    }

    if (pinHash) {
      await commentCol.updateOne({ _id: comment._id }, { $set:{ pinHash } });
      console.log(`Save pin hash to: ${comment._id}`);
    }
  }
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
