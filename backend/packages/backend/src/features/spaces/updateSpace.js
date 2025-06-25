const omit = require("lodash.omit");
const isNil = require("lodash.isnil");
const { getSpaceCollection } = require("../../mongo");
const {
  checkIsSpaceAdmin,
  checkSpaceName,
  checkSpaceLogo,
  pinLogo,
} = require("./common");
const { reloadSpaces } = require("../../spaces");

async function updateSpace(ctx) {
  const { space } = ctx.params;

  const {
    data: { name, logo },
    address,
  } = ctx.request.body;

  checkSpaceName(name);
  checkSpaceLogo(logo);

  await checkIsSpaceAdmin(space, address);

  const updates = { name };
  if (!isNil(logo)) {
    const logoCid = await pinLogo(logo);
    updates.spaceIcon = logoCid;
  }

  const spaceCol = await getSpaceCollection();
  const result = await spaceCol.findOneAndUpdate(
    { id: space },
    { $set: updates },
    { returnDocument: "after" },
  );

  // Refresh space cache
  await reloadSpaces();

  ctx.body = omit(result.value || {}, ["_id"]);
}

module.exports = {
  updateSpace,
};
