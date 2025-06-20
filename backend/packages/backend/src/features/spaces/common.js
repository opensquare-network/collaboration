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

function checkSpaceName(name) {
  if (!name) {
    throw new HttpError(400, "Name is required");
  }

  if (name.length > 20) {
    throw new HttpError(400, "Space name too long");
  }

  if (!/^[a-zA-Z0-9_\-\s]+$/.test(name)) {
    throw new HttpError(
      400,
      "Only letters, numbers, spaces, underscores and hyphens are allowed in space name",
    );
  }
}

function checkSpaceLogo(logo) {
  if (!logo) {
    throw new HttpError(400, "Logo is required");
  }

  // Check if logo is a valid data URI
  if (!/^data:image\/\w+;base64,/.test(logo)) {
    throw new HttpError(400, "Logo must be a valid data URI");
  }
}

module.exports = {
  pinLogo,
  checkSpaceExists,
  checkSpaceName,
  checkSpaceLogo,
};
