const { HttpError } = require("../../exc");
const slugify = require("slugify");
const { getSpaceCollection } = require("../../mongo");
const { ipfsAddBuffer } = require("../../services/ipfs.service/ipfs");
const { reloadSpaces } = require("../../spaces");
const { strategies } = require("../../consts/voting");

const dataUriToBuffer = (dataUri) =>
  import("data-uri-to-buffer").then(({ default: fn }) => fn(dataUri));

function checkAssetParams({
  chain,
  decimals,
  ss58Format,
  symbol,
  votingThreshold,
  votingWeight,
  assetId,
  contract,
  type,
}) {
  if (!chain) {
    throw new HttpError(400, "Asset chain is required");
  }

  if (ss58Format === undefined) {
    throw new HttpError(400, "Asset ss58 format is required");
  }

  if (ss58Format < 0) {
    throw new HttpError(400, "Asset ss58Format can't be negative");
  }

  if (!symbol) {
    throw new HttpError(400, "Asset symbol is required");
  }

  if (decimals === undefined) {
    throw new HttpError(400, "Asset decimals is required");
  }

  if (decimals <= 0) {
    throw new HttpError(400, "Asset decimals must be greater than 0");
  }

  if (votingThreshold === undefined) {
    throw new HttpError(400, "Asset voting threshold is required");
  }

  if (votingThreshold < 0) {
    throw new HttpError(400, "Asset voting threshold can't be negative");
  }

  if (votingWeight === undefined) {
    throw new HttpError(400, "Asset voting weight is required");
  }

  if (votingWeight < 0) {
    throw new HttpError(400, "Asset voting weight can't be negative");
  }

  if (type === "erc20" && !contract) {
    throw new HttpError(400, "Asset contract is required");
  }

  if (type === "asset" && assetId === undefined) {
    throw new HttpError(400, "Asset id is required");
  }
}

function checkSpaceParams({
  name,
  logo,
  assets,
  symbol,
  decimals,
  proposalThreshold,
  weightStrategy,
}) {
  if (!name) {
    throw new HttpError(400, "Name is required");
  }

  if (!logo) {
    throw new HttpError(400, "Logo is required");
  }

  if (!symbol) {
    throw new HttpError(400, "Space symbol is required");
  }

  if (decimals === undefined) {
    throw new HttpError(400, "Space decimals is required");
  }

  if (decimals <= 0) {
    throw new HttpError(400, "Decimals must be greater than 0");
  }

  if (proposalThreshold === undefined) {
    throw new HttpError(400, "Proposal threshold is required");
  }

  if (proposalThreshold < 0) {
    throw new HttpError(400, "Proposal threshold can't be negative");
  }

  if (!weightStrategy || !weightStrategy.length) {
    throw new HttpError(400, "Weight strategy is required");
  }

  for (const item of weightStrategy) {
    if (!Object.values(strategies).includes(item)) {
      throw new HttpError(400, `Invalid weight strategy: ${item}`);
    }
  }

  if (!assets || !assets.length) {
    throw new HttpError(400, "Assets are required");
  }

  for (const asset of assets) {
    checkAssetParams(asset);
  }
}

async function createSpace(ctx) {
  checkSpaceParams(ctx.request.body);

  const {
    name,
    logo,
    assets,
    symbol,
    decimals,
    proposalThreshold,
    weightStrategy,
  } = ctx.request.body;

  const assetsByNetwork = assets.reduce((acc, asset) => {
    const {
      chain,
      decimals,
      ss58Format,
      symbol,
      votingThreshold,
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
      votingThreshold,
      multiplier: votingWeight,
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
    weightStrategy,
    version: "4",
    spaceIcon: logoCid,
  };

  const spaceCol = await getSpaceCollection();
  await spaceCol.updateOne(
    { id: name },
    { $set: spaceConfig },
    { upsert: true },
  );

  // Refresh space cache
  await reloadSpaces();

  ctx.body = {
    spaceId: id,
  };
}

module.exports = {
  createSpace,
};
