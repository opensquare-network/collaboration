const omit = require("lodash.omit");
const { getSpaceCollection } = require("../../mongo");
const { checkAddressList, checkIsSpaceAdmin } = require("./common");

async function updateSpaceAdmins(ctx) {
  const { space } = ctx.params;

  const { data: admins, address } = ctx.request.body;

  checkAddressList(admins, "Admins");

  await checkIsSpaceAdmin(space, address);

  const spaceCol = await getSpaceCollection();
  const result = await spaceCol.findOneAndUpdate(
    { id: space },
    { $set: { admins } },
    { upsert: true, returnDocument: "after" },
  );

  ctx.body = omit(result.value || {}, ["_id"]);
}

module.exports = { updateSpaceAdmins };
