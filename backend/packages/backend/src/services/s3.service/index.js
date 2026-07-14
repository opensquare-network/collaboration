const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { requireEnv } = require("../../utils/requireEnv");
const { cidOf, cidOfBuffer } = require("../../utils/cid");

let s3Client;

function getS3Client() {
  if (!s3Client) {
    s3Client = new S3Client({
      region: "auto",
      endpoint: requireEnv("S3_API"),
      credentials: {
        accessKeyId: requireEnv("S3_ACCESS_KEY_ID"),
        secretAccessKey: requireEnv("S3_SECRET_ACCESS_KEY"),
      },
      forcePathStyle: true,
    });
  }

  return s3Client;
}

const trimTailSlash = (url) =>
  url.endsWith("/") ? url.substr(0, url.length - 1) : url;

async function uploadBufferToS3(file, key) {
  const cid = key || (await cidOfBuffer(file.buffer));

  await getS3Client().send(
    new PutObjectCommand({
      Bucket: requireEnv("S3_BUCKET"),
      Key: cid,
      Body: file.buffer,
      ContentType: file.mimetype,
    }),
  );

  return {
    cid,
    url: `${trimTailSlash(requireEnv("S3_PUBLIC_ENDPOINT"))}/${cid}`,
  };
}

async function uploadJsonToS3(data, key) {
  const cid = key || (await cidOf(data));
  const body = JSON.stringify(data);

  await getS3Client().send(
    new PutObjectCommand({
      Bucket: requireEnv("S3_BUCKET"),
      Key: cid,
      Body: body,
      ContentType: "application/json",
    }),
  );

  return {
    cid,
    url: `${trimTailSlash(requireEnv("S3_PUBLIC_ENDPOINT"))}/${cid}`,
  };
}

module.exports = {
  uploadBufferToS3,
  uploadJsonToS3,
};
