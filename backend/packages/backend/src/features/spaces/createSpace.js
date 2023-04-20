const slugify = require("slugify");
const { getSpaceCollection } = require("../../mongo");
const { ipfsAddBuffer } = require("../../services/ipfs.service/ipfs");

const dataUriToBuffer = (dataUri) =>
  import("data-uri-to-buffer").then(({ default: fn }) => fn(dataUri));

async function createSpace(ctx) {
  const {
    name,
    logo,
    assets,
    symbol,
    decimals,
    proposalThreshold,
    strategies,
  } = ctx.request.body;

  const assetsByNetwork = assets.reduce((acc, asset) => {
    const {
      chain,
      decimals,
      ss58Format,
      symbol,
      threshold,
      votingWeight,
      assetId,
      contract,
      type,
    } = asset;

    if (!acc[chain]) {
      acc[chain] = { network: chain, ss58Format, assets: [] };
    }

    const item = {
      symbol,
      decimals,
      threshold,
      votingWeight,
    };
    if (type !== undefined) item.type = type;
    if (assetId !== undefined) item.assetId = assetId;
    if (contract !== undefined) item.contract = contract;

    acc[chain].assets.push(item);
    return acc;
  }, {});

  let logoCid = null;
  if (logo) {
    const buf = await dataUriToBuffer(logo);
    const added = await ipfsAddBuffer(buf);
    logoCid = added.path;
  }

  const id = slugify(name);
  const spaceConfig = {
    id,
    name,
    symbol,
    decimals,
    networks: Object.values(assetsByNetwork),
    proposeThreshold: proposalThreshold,
    weightStrategy: strategies,
    version: "4",
    spaceIcon: logoCid,
  };

  const spaceCol = await getSpaceCollection();
  await spaceCol.updateOne(
    { id: name },
    { $set: spaceConfig },
    { upsert: true },
  );

  ctx.body = {
    spaceId: id,
  };
}

module.exports = {
  createSpace,
};
