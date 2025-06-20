const { HttpError } = require("../../exc");
const { getSpaceCollection } = require("../../mongo");
const { ipfsAddBuffer } = require("../../services/ipfs.service/ipfs");

const dataUriToBuffer = (dataUri) =>
  import("data-uri-to-buffer").then(({ default: fn }) => fn(dataUri));

async function pinLogo(logo) {
  let logoCid = null;
  if (logo) {
    const buf = await dataUriToBuffer(logo);
    const added = await ipfsAddBuffer(buf);
    logoCid = added.path;
  }

  return logoCid;
}

async function checkSpaceExists(id) {
  const spaceCol = await getSpaceCollection();
  const existingSpace = await spaceCol.findOne({ id });
  if (existingSpace) {
    throw new HttpError(400, `Space with id ${id} already exists`);
  }
}

module.exports = {
  pinLogo,
  checkSpaceExists,
};
