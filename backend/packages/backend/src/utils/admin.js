const { spaces: spaceServices } = require("../spaces");
const { HttpError } = require("../exc");
const { isSameAddress } = require("./address");

function isAdmin(space, address) {
  const spaceConfig = spaceServices[space];
  if (!spaceConfig) {
    throw new HttpError(500, "Unknown space");
  }
  return (
    (spaceConfig.admins || []).findIndex((item) =>
      isSameAddress(item, address),
    ) !== -1
  );
}

module.exports = {
  isAdmin,
};
