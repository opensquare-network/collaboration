const { HttpError } = require("../exc");
const { isValidSignature } = require("../utils");

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

  await next();
}

module.exports = requireSignature;
