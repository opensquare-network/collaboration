const Hash = require("ipfs-only-hash");
const { pinJsonToIpfs } = require("./pin");
const pick = require("lodash.pick");

async function pinJsonToIpfsWithTimeout(json, timeout) {
  const errorMsg = "Pin json to ipfs timeout";
  return await Promise.race([
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error(errorMsg)), timeout),
    ),
    pinJsonToIpfs(json),
  ]);
}

async function getObjectBufAndCid(data) {
  const jsonData = JSON.stringify(data);
  const buf = Buffer.from(jsonData);
  const cid = await Hash.of(buf);
  return { buf, cid };
}

async function pinCollectionDataToIpfs(col) {
  const items = await col.find({ pinHash: null }).toArray();
  await pinItemsToIpfs(col, items);
}

async function repinCollectionDataToIpfs(col) {
  const items = await col.find().toArray();
  await pinItemsToIpfs(col, items);
}

async function pinItemsToIpfs(col, items) {
  for (const item of items) {
    try {
      const toBePin = {
        ...pick(item, ["data", "address", "signature", "delegators"]),
        // version 2: replace `msg` with `data`
        version: "2",
      };
      const pinHash = await pinJsonToIpfs(toBePin);

      if (pinHash) {
        await col.updateOne({ _id: item._id }, { $set: { pinHash } });
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
  repinCollectionDataToIpfs,
};
