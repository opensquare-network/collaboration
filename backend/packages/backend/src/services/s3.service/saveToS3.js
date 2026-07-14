const pick = require("lodash/pick");
const Hash = require("ipfs-only-hash");
const { uploadJsonToS3, uploadBufferToS3 } = require(".");

async function saveJsonToStorage(json) {
  const { cid } = await uploadJsonToS3(json);
  return cid;
}

async function saveFileToStorage(file) {
  const { cid } = await uploadBufferToS3(file);
  return cid;
}

async function saveJsonToStorageWithTimeout(json, timeout) {
  const errorMsg = "Pin json to storage timeout";
  return await Promise.race([
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error(errorMsg)), timeout),
    ),
    saveJsonToStorage(json),
  ]);
}

async function getObjectBufAndCid(data) {
  const jsonData = JSON.stringify(data);
  const buf = Buffer.from(jsonData);
  const cid = await Hash.of(buf);
  return { buf, cid };
}

async function saveItemsToS3(col, items) {
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

async function saveCollectionDataToS3(col) {
  const items = await col.find({ pinHash: null }).toArray();
  await saveItemsToS3(col, items);
}

async function resaveCollectionDataToS3(col) {
  const items = await col.find().toArray();
  await saveItemsToS3(col, items);
}

module.exports = {
  saveFileToStorage,
  saveJsonToStorage,
  saveJsonToStorageWithTimeout,
  getObjectBufAndCid,
  saveCollectionDataToS3,
  resaveCollectionDataToS3,
};
