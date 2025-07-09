const slugify = require("slugify");
const { getSpaceCollection } = require("../../mongo");
const { reloadSpaces } = require("../../spaces");
const { strategies } = require("../../consts/voting");
const { Accessibility, SpaceType } = require("../../consts/space");
const {
  pinLogo,
  checkSpaceConflict,
  checkSpaceName,
  checkSpaceLogo,
  checkAddressList,
  checkRecaptchaResponse,
} = require("./common");
const { HttpError } = require("../../exc");
const { isUseReCaptcha } = require("../../utils");

function checkSpaceAdmins(admins) {
  checkAddressList(admins, "Admins");
  if (admins.length > 10) {
    throw new HttpError(400, "Admins list cannot exceed 10 addresses");
  }
}

async function checkSpaceParams({ name, logo, members, admins, captcha }) {
  checkSpaceName(name);
  checkSpaceLogo(logo);
  checkAddressList(members, "Members");
  checkSpaceAdmins(admins);
  if (isUseReCaptcha()) {
    await checkRecaptchaResponse(captcha);
  }
}

async function createDaoSpace(ctx) {
  await checkSpaceParams(ctx.request.body);

  const { name, logo, members, admins } = ctx.request.body;
  const id = slugify(name).toLowerCase();
  await checkSpaceConflict(id);
  const logoCid = await pinLogo(logo);

  const spaceConfig = {
    id,
    name,
    type: SpaceType.CollectivesDao,
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
