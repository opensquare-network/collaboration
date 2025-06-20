const slugify = require("slugify");
const { HttpError } = require("../../exc");
const { getSpaceCollection } = require("../../mongo");
const { reloadSpaces } = require("../../spaces");
const { strategies } = require("../../consts/voting");
const { Accessibility } = require("../../consts/space");
const { networks } = require("../../consts/networks");
const { pinLogo, checkSpaceExists } = require("./common");

function checkSpaceParams({ name, logo }) {
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

  if (!logo) {
    throw new HttpError(400, "Logo is required");
  }
}

async function createDaoSpace(ctx) {
  checkSpaceParams(ctx.request.body);

  const { name, logo, whitelist } = ctx.request.body;

  const id = slugify(name).toLowerCase();

  await checkSpaceExists(id);

  const logoCid = await pinLogo(logo);

  const spaceConfig = {
    id,
    name,
    symbol: "DOT",
    decimals: 10,
    networks: [
      {
        network: networks.polkadot,
        ss58Format: 0,
        assets: [
          {
            symbol: "DOT",
            decimals: 10,
          },
        ],
      },
    ],
    accessibility: Accessibility.WHITELIST,
    whitelist,
    weightStrategy: [strategies.onePersonOneVote],
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
