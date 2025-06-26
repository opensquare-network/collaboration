const omit = require("lodash.omit");
const { getSpaceCollection } = require("../../mongo");
const { checkAddressList, checkIsSpaceAdmin } = require("./common");
const { reloadSpaces } = require("../../spaces");

async function updateSpaceMembers(ctx) {
  const { space } = ctx.params;

  const {
    data: { members },
    address,
  } = ctx.request.body;
  checkAddressList(members, "Members");
  await checkIsSpaceAdmin(space, address);

  const spaceCol = await getSpaceCollection();
  const result = await spaceCol.findOneAndUpdate(
    { id: space },
    { $set: { members } },
    { upsert: true, returnDocument: "after" },
  );

  // Refresh space cache
  await reloadSpaces();

  ctx.body = omit(result.value || {}, ["_id"]);
}

module.exports = { updateSpaceMembers };
