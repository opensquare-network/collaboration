const Hash = require("ipfs-only-hash");
const { CID } = require("multiformats/cid");

async function cidOfBuffer(buffer) {
  const cidV0 = await Hash.of(buffer);
  const cid = CID.parse(cidV0);
  return cid.toV1().toString();
}

async function cidOf(obj) {
  return await cidOfBuffer(Buffer.from(JSON.stringify(obj)));
}

module.exports = {
  cidOf,
  cidOfBuffer,
};
