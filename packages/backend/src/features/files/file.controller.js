const { HttpError } = require("../../exc");
const { getEnvDecooIpfsEndpoint } = require("../../env");
const { pinFileToIpfs } = require("../../services/ipfs.service/pin");

const DECOO_IPFS_ENDPOINT = getEnvDecooIpfsEndpoint();
if (!DECOO_IPFS_ENDPOINT) {
  console.error("DECOO_IPFS_ENDPOINT is not properly configured");
  process.exit();
}

const Megabyte = 1024 * 1024;

const trimTailSlash = (url) =>
  url.endsWith("/") ? url.substr(0, url.length - 1) : url;

async function getFile(ctx) {
  const { hash } = ctx.params;
  ctx.redirect(`${trimTailSlash(DECOO_IPFS_ENDPOINT)}/${hash}`);
}

async function getIpfsEndpoint(ctx) {
  ctx.body = {
    endpoint: trimTailSlash(DECOO_IPFS_ENDPOINT),
  };
}

async function upload(ctx) {
  const file = ctx.request.file;
  if (!file) {
    throw new HttpError(400, "File is missing");
  }

  if (file.size > 10 * Megabyte) {
    throw new HttpError(
      400,
      t("The upload file has exceeded the size limitation")
    );
  }

  try {
    const hash = await pinFileToIpfs(file);
    ctx.body = {
      hash,
      url: `${trimTailSlash(DECOO_IPFS_ENDPOINT)}/${hash}`,
    };
  } catch (e) {
    throw new HttpError(500, e.message);
  }
}

module.exports = {
  getFile,
  getIpfsEndpoint,
  upload,
};
