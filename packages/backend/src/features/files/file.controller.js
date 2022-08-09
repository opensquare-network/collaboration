const { HttpError } = require("../../exc");
const { IPFS_ENDPOINT, NODE_API_ENDPOINT } = require("../../env");
const { pinFileToIpfs } = require("../../services/ipfs.service/pin");

const Megabyte = 1024 * 1024;

const trimTailSlash = (url) =>
  url.endsWith("/") ? url.substr(0, url.length - 1) : url;

async function getFile(ctx) {
  const { hash } = ctx.params;
  ctx.redirect(`${trimTailSlash(IPFS_ENDPOINT)}/${hash}`);
}

async function getIpfsEndpoint(ctx) {
  ctx.body = {
    endpoint: trimTailSlash(IPFS_ENDPOINT),
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
      url: `${trimTailSlash(NODE_API_ENDPOINT)}/ipfs/files/${hash}`,
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
