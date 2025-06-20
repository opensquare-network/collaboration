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

function checkSpaceParams({ name, logo, whitelist, admins }) {
  checkSpaceName(name);
  checkSpaceLogo(logo);
  checkAddressList(whitelist, "Whitelist");
  checkAddressList(admins, "Admins");
}

async function createDaoSpace(ctx) {
  checkSpaceParams(ctx.request.body);

  const { name, logo, whitelist, admins } = ctx.request.body;

  const id = slugify(name).toLowerCase();

  await checkSpaceConflict(id);

  const logoCid = await pinLogo(logo);

  const spaceConfig = {
    id,
    name,
    type: "collectives-dao",
    accessibility: Accessibility.WHITELIST,
    whitelist,
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
