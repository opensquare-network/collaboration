const slugify = require("slugify");
const { getSpaceCollection } = require("../../mongo");
const { reloadSpaces } = require("../../spaces");
const { strategies } = require("../../consts/voting");
const { Accessibility } = require("../../consts/space");
const {
  pinLogo,
  checkSpaceConflict,
  checkSpaceName,
  checkSpaceLogo,
  checkAddressList,
} = require("./common");
const { HttpError } = require("../../exc");

function checkSpaceAdmins(admins) {
  checkAddressList(admins, "Admins");
  if (admins.length > 10) {
    throw new HttpError(400, "Admins list cannot exceed 10 addresses");
  }
}

function checkSpaceParams({ name, logo, members, admins }) {
  checkSpaceName(name);
  checkSpaceLogo(logo);
  checkAddressList(members, "Members");
  checkSpaceAdmins(admins);
}

async function createDaoSpace(ctx) {
  checkSpaceParams(ctx.request.body);

  const { name, logo, members, admins } = ctx.request.body;
  const id = slugify(name).toLowerCase();
  await checkSpaceConflict(id);
  const logoCid = await pinLogo(logo);

  const spaceConfig = {
    id,
    name,
    type: "collectives-dao",
    accessibility: Accessibility.WHITELIST,
    members,
    weightStrategy: [strategies.onePersonOneVote],
    admins,
    version: "4",
    spaceIcon: logoCid,
  };

  const spaceCol = await getSpaceCollection();
  await spaceCol.updateOne({ id }, { $set: spaceConfig }, { upsert: true });

  // Refresh space cache
  await reloadSpaces();

  ctx.body = {
    spaceId: id,
  };
}

module.exports = {
  createDaoSpace,
};
