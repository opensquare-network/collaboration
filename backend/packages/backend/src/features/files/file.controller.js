const { HttpError } = require("../../exc");
const { pinFileToStorage } = require("../../services/s3.service/pin");

const Megabyte = 1024 * 1024;

const trimTailSlash = (url) =>
  url.endsWith("/") ? url.substr(0, url.length - 1) : url;

async function getS3Endpoint(ctx) {
  ctx.body = {
    endpoint: trimTailSlash(process.env.S3_PUBLIC_ENDPOINT),
  };
}

async function getS3File(ctx) {
  const { cid } = ctx.params;
  ctx.redirect(`${trimTailSlash(process.env.S3_PUBLIC_ENDPOINT)}/${cid}`);
}

async function uploadFile(ctx) {
  const file = ctx.request.file;
  if (!file) {
    throw new HttpError(400, "File is missing");
  }

  if (file.size > 10 * Megabyte) {
    throw new HttpError(
      400,
      "The upload file has exceeded the size limitation",
    );
  }

  try {
    const hash = await pinFileToStorage(file);

    ctx.body = {
      cid: hash,
      url: `${trimTailSlash(process.env.S3_PUBLIC_ENDPOINT)}/${hash}`,
    };
  } catch (e) {
    throw new HttpError(500, e.message);
  }
}

module.exports = {
  getS3Endpoint,
  getS3File,
  uploadFile,
};
