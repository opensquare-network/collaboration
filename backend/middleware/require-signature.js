const { HttpError } = require("../exc");
const { isValidSignature } = require("../utils");
const ipfsService = require("../services/ipfs.service");

async function verifySignature(msg, address, signature) {
  if (!signature) {
    throw new HttpError(400, "Signature is missing");
  }

  if (!address) {
    throw new HttpError(400, "Address is missing");
  }

  const isValid = isValidSignature(msg, signature, address);
  if (!isValid) {
    throw new HttpError(400, "Signature is invalid");
  }

  return true;
}

async function requireSignature(ctx, next) {
  const { data, address, signature } = ctx.request.body;
  if (!data) {
    throw new HttpError(400, "Data is missing");
  }

  if (!signature) {
    throw new HttpError(400, "Signature is missing");
  }

  const msg = JSON.stringify(data);
  await verifySignature(msg, address, signature);

  const { buf, cid } = await ipfsService.getObjectBufAndCid({
    msg,
    address,
    signature,
    version: "1",
  });

  let pinHash = undefined;
  try {
    const pinResult = await ipfsService.pinJsonToIpfsWithTimeout(buf, cid, 3000);
    pinHash = pinResult.PinHash;
  } catch (e) {
    console.error(e);
  }

  ctx.pinHash = pinHash;
  ctx.cid = cid;

  await next();

}

module.exports = requireSignature;
