const Hash = require("ipfs-only-hash");
const { pinJsonToIpfs } = require("./pin");

async function pinJsonToIpfsWithTimeout(buf, cid, timeout, prefix) {
  const errorMsg = "Pin json to ipfs timeout";
  return await Promise.race([
    new Promise((_, reject) => setTimeout(() => reject(new Error(errorMsg)), timeout)),
    pinJsonToIpfs(buf, cid, prefix),
  ]);
}

async function getObjectBufAndCid(data) {
  const jsonData = JSON.stringify(data);
  const buf = Buffer.from(jsonData);
  const cid = await Hash.of(buf);
  return { buf, cid };
}

async function pinCollectionDataToIpfs(col, prefix) {
  const items = await col.find({ pinHash: null }).toArray();
  for (const item of items) {
    try {
      const msg = JSON.stringify(item.data);
      const { buf, cid } = await getObjectBufAndCid({
        msg,
        address: item.address,
        signature: item.signature,
        version: "1",
      });
      const pinResult = await pinJsonToIpfs(buf, cid, prefix);
      pinHash = pinResult.PinHash;

      if (pinHash) {
        await col.updateOne({ _id: item._id }, { $set:{ pinHash } });
        console.log(`Save pin hash ${pinHash} to: ${item._id}`);
      }
    } catch (e) {
      console.error(e);
    }
  }
}


module.exports = {
  pinJsonToIpfsWithTimeout,
  getObjectBufAndCid,
  pinCollectionDataToIpfs,
};
