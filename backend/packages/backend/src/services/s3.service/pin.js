const pick = require("lodash/pick");
const Hash = require("ipfs-only-hash");
const { uploadJsonToS3, uploadBufferToS3 } = require(".");

async function pinJsonToStorage(json) {
  const { cid } = await uploadJsonToS3(json);
  return cid;
}

async function pinFileToStorage(file) {
  const { cid } = await uploadBufferToS3(file);
  return cid;
}

async function pinJsonToStorageWithTimeout(json, timeout) {
  const errorMsg = "Pin json to storage timeout";
  return await Promise.race([
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error(errorMsg)), timeout),
    ),
    pinJsonToStorage(json),
  ]);
}

async function getObjectBufAndCid(data) {
  const jsonData = JSON.stringify(data);
  const buf = Buffer.from(jsonData);
  const cid = await Hash.of(buf);
  return { buf, cid };
}

async function pinItemsToS3(col, items) {
  for (const item of items) {
    try {
      const toBePin = {
        ...pick(item, ["data", "address", "signature", "delegators"]),
        version: "2",
      };
      const result = await uploadJsonToS3(toBePin);

      if (result && result.cid) {
        await col.updateOne(
          { _id: item._id },
          { $set: { pinHash: result.cid } },
        );
        console.log(`Save pin hash ${result.cid} to: ${item._id}`);
      }
    } catch (e) {
      console.error(e);
    }
  }
}

async function pinCollectionDataToS3(col) {
  const items = await col.find({ pinHash: null }).toArray();
  await pinItemsToS3(col, items);
}

async function repinCollectionDataToS3(col) {
  const items = await col.find().toArray();
  await pinItemsToS3(col, items);
}

module.exports = {
  pinFileToStorage,
  pinJsonToStorage,
  pinJsonToStorageWithTimeout,
  getObjectBufAndCid,
  pinCollectionDataToS3,
  repinCollectionDataToS3,
};
