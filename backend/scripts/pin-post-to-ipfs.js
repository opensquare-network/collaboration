const dotenv = require("dotenv");
dotenv.config();

const { getPostCollection } = require("../mongo");
const ipfsService = require("../services/ipfs.service");

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function startPin() {
  const postCol = await getPostCollection();
  const posts = await postCol.find({ pinHash: null }).toArray();
  for (const post of posts) {
    let pinHash = undefined;

    try {
      const msg = JSON.stringify(post.data);
      const pinResult = await ipfsService.pinJsonToIpfs({
        msg,
        address: post.address,
        signature: post.signature,
        version: "1",
      });
      pinHash = pinResult.PinHash;
      console.log(`Pin hash: ${pinHash}`);
    } catch (e) {
      console.error(e);
    }

    if (pinHash) {
      await postCol.updateOne({ _id: post._id }, { $set:{ pinHash } });
      console.log(`Save pin hash to: ${post._id}`);
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
