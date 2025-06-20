const slugify = require("slugify");
const { HttpError } = require("../../exc");
const { getSpaceCollection } = require("../../mongo");
const { reloadSpaces } = require("../../spaces");
const { strategies } = require("../../consts/voting");
const { Accessibility } = require("../../consts/space");
const { networks } = require("../../consts/networks");
const {
  pinLogo,
  checkSpaceExists,
  checkSpaceName,
  checkSpaceLogo,
} = require("./common");
const { isAddress } = require("@polkadot/util-crypto");

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
