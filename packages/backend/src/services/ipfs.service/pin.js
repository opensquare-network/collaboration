const crypto = require("crypto");
const axios = require("axios");
const FormData = require("form-data");
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

async function pinJsonToIpfs(buf, cid) {
  const fullPrivateKey = `-----BEGIN PRIVATE KEY-----\n${DECOO_API_SECRET_KEY}\n-----END PRIVATE KEY-----`;
  const secret = crypto
    .privateEncrypt(fullPrivateKey, Buffer.from(cid))
    .toString("base64");
  const formdata = new FormData();
  formdata.append("file", buf, {
    filename: "grade-" + Date.now() + ".json",
    contentType: "application/json",
  });
  formdata.append("cid", cid);
  formdata.append("secret", secret);

  const tokenResult = await axios.get(
    `${trimTailSlash(DECOO_API_OAUTH_ENDPOINT)}/oauth/accessToken`,
    {
      headers: {
        authorization: `Bearer ${DECOO_API_TOKEN}`,
      },
    }
  );
  const accessToken = tokenResult.data.Data;

  const pinResult = await axios.post(
    `${trimTailSlash(DECOO_API_UPLOAD_ENDPOINT)}/pinning/pinFile`,
    formdata,
    {
      headers: {
        ...formdata.getHeaders(),
        useraccesstoken: accessToken,
      },
    }
  );

  return pinResult.data;
}

module.exports = {
  pinJsonToIpfs,
};
