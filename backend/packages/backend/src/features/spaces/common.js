const { isAddress } = require("@polkadot/util-crypto");
const { HttpError } = require("../../exc");
const { getSpaceCollection } = require("../../mongo");
const { ipfsAddBuffer } = require("../../services/ipfs.service/ipfs");
const { isSameAddress } = require("../../utils/address");

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

async function checkSpaceConflict(id) {
  const spaceCol = await getSpaceCollection();
  const existingSpace = await spaceCol.findOne({ id });
  if (existingSpace) {
    throw new HttpError(400, `Space with id ${id} already exists`);
  }
}

async function checkIsSpaceAdmin(spaceId, address) {
  const spaceCol = await getSpaceCollection();
  const existingSpace = await spaceCol.findOne({ id: spaceId });
  if (!existingSpace) {
    throw new HttpError(400, `Space with id ${spaceId} does not exist`);
  }

  if (
    !existingSpace.admins ||
    !existingSpace.admins.some((item) => isSameAddress(item, address))
  ) {
    throw new HttpError(403, `You are not an admin of space ${spaceId}`);
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

function checkAddressList(addressList, listName) {
  if (!Array.isArray(addressList)) {
    throw new HttpError(400, `${listName} must be an array`);
  }

  if (addressList.length === 0) {
    throw new HttpError(400, `${listName} must not be empty`);
  }

  addressList.forEach((item) => {
    if (typeof item !== "string") {
      throw new HttpError(400, `${listName} must contain only strings`);
    }

    // Must be valid address
    if (!isAddress(item)) {
      throw new HttpError(400, `${listName} contains invalid address: ${item}`);
    }
  });
}

module.exports = {
  pinLogo,
  checkSpaceConflict,
  checkIsSpaceAdmin,
  checkSpaceName,
  checkSpaceLogo,
  checkAddressList,
};
