const { HttpError } = require("../exc");
const { isValidSignature } = require("../utils");
const { ethers } = require("ethers");
const { hexAddPrefix } = require("@polkadot/util");

async function verifySignature(msg, address, signature) {
  if (!signature) {
    throw new HttpError(400, "Signature is missing");
  }

  if (!address) {
    throw new HttpError(400, "Address is missing");
  }

  if (ethers.utils.isAddress(address)) {
    try {
      const verifiedAddress = ethers.utils.verifyMessage(
        msg,
        hexAddPrefix(signature)
      );
      return verifiedAddress === address;
    } catch (e) {
      return false;
    }
  }

  return isValidSignature(msg, signature, address);
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
  const verified = await verifySignature(msg, address, signature);
  if (!verified) {
    throw new HttpError(400, "Signature is invalid");
  }

  await next();
}

module.exports = requireSignature;
