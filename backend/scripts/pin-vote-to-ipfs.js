const dotenv = require("dotenv");
dotenv.config();

const { getVoteCollection } = require("../mongo");
const ipfsService = require("../services/ipfs.service");

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function startPin() {
  const voteCol = await getVoteCollection();
  const votes = await voteCol.find({ pinHash: null }).toArray();
  for (const vote of votes) {
    let pinHash = undefined;

    try {
      const msg = JSON.stringify(vote.data);
      const pinResult = await ipfsService.pinJsonToIpfs({
        msg,
        address: vote.address,
        signature: vote.signature,
        version: "1",
      });
      pinHash = pinResult.PinHash;
      console.log(`Pin hash: ${pinHash}`);
    } catch (e) {
      console.error(e);
    }

    if (pinHash) {
      await voteCol.updateOne({ _id: vote._id }, { $set:{ pinHash } });
      console.log(`Save pin hash to: ${vote._id}`);
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
