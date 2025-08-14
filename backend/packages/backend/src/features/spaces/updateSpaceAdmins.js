const omit = require("lodash.omit");
const { getSpaceCollection } = require("../../mongo");
const { checkAddressList, checkIsSpaceAdmin } = require("./common");
const { reloadSpaces } = require("../../spaces");

async function updateSpaceAdmins(ctx) {
  const { space } = ctx.params;

  const {
    data: { admins },
    address,
  } = ctx.request.body;
  checkAddressList(admins, "Admins");
  await checkIsSpaceAdmin(space, address);

  const spaceCol = await getSpaceCollection();
  const result = await spaceCol.findOneAndUpdate(
    { id: space },
    { $set: { admins } },
    { returnDocument: "after" },
  );

  // Refresh space cache
  await reloadSpaces();

  ctx.body = omit(result || {}, ["_id"]);
}

module.exports = { updateSpaceAdmins };
