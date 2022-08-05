const crypto = require("crypto");
const fetch = require("node-fetch");
const FormData = require("form-data");
const Hash = require("ipfs-only-hash");
const {
  getEnvDecooApiToken,
  getEnvDecooApiSecretKey,
  getEnvDecooApiOAuthEndpoint,
  getEnvDecooApiUploadEndpoint,
} = require("../../env");

const DECOO_API_TOKEN = getEnvDecooApiToken();
if (!DECOO_API_TOKEN) {
  console.error("DECOO_API_TOKEN is not properly configured");
  process.exit();
}

const DECOO_API_SECRET_KEY = getEnvDecooApiSecretKey();
if (!DECOO_API_SECRET_KEY) {
  console.error("DECOO_API_SECRET_KEY is not properly configured");
  process.exit();
}

const DECOO_API_OAUTH_ENDPOINT = getEnvDecooApiOAuthEndpoint();
if (!DECOO_API_OAUTH_ENDPOINT) {
  console.error("DECOO_API_OAUTH_ENDPOINT is not properly configured");
  process.exit();
}

const DECOO_API_UPLOAD_ENDPOINT = getEnvDecooApiUploadEndpoint();
if (!DECOO_API_UPLOAD_ENDPOINT) {
  console.error("DECOO_API_UPLOAD_ENDPOINT is not properly configured");
  process.exit();
}

const trimTailSlash = (url) =>
  url.endsWith("/") ? url.substr(0, url.length - 1) : url;

async function pinDataToIpfs(buffer, cid, filename, mimeType) {
  const fullPrivateKey = `-----BEGIN PRIVATE KEY-----\n${DECOO_API_SECRET_KEY}\n-----END PRIVATE KEY-----`;
  const secret = crypto
    .privateEncrypt(fullPrivateKey, Buffer.from(cid))
    .toString("base64");
  const formdata = new FormData();
  formdata.append("file", buffer, {
    filename,
    contentType: mimeType,
  });
  formdata.append("cid", cid);
  formdata.append("secret", secret);

  const tokenResp = await fetch(
    `${trimTailSlash(DECOO_API_OAUTH_ENDPOINT)}/oauth/accessToken`,
    {
      headers: {
        authorization: `Bearer ${DECOO_API_TOKEN}`,
      },
    }
  );
  const tokenResult = await tokenResp.json();
  if (!tokenResp.ok || tokenResult.Code !== 200) {
    throw new Error(tokenResult.Msg);
  }
  const accessToken = tokenResult.Data;

  const pinResp = await fetch(
    `${trimTailSlash(DECOO_API_UPLOAD_ENDPOINT)}/pinning/pinFile`,
    {
      method: "POST",
      body: formdata,
      headers: {
        ...formdata.getHeaders(),
        useraccesstoken: accessToken,
      },
    }
  );

  const pinResult = await pinResp.json();
  if (!tokenResp.ok || !pinResult.PinHash) {
    throw new Error(pinResult.Msg);
  }

  return pinResult.PinHash;
}

async function pinJsonToIpfs(buffer, cid, prefix) {
  return await pinDataToIpfs(
    buffer,
    cid,
    prefix + Date.now() + ".json",
    "application/json"
  );
}

async function pinFileToIpfs(file) {
  const cid = await Hash.of(file.buffer);
  return await pinDataToIpfs(
    file.buffer,
    cid,
    file.originalname,
    file.mimetype
  );
}

module.exports = {
  pinDataToIpfs,
  pinFileToIpfs,
  pinJsonToIpfs,
};
