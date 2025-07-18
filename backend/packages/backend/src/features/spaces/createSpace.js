const { HttpError } = require("../../exc");
const slugify = require("slugify");
const { getSpaceCollection } = require("../../mongo");
const { reloadSpaces } = require("../../spaces");
const { strategies } = require("../../consts/voting");
const isNil = require("lodash.isnil");
const { chainsDef } = require("../../constants");
const {
  pinLogo,
  checkSpaceConflict,
  checkSpaceName,
  checkSpaceLogo,
  checkRecaptchaResponse,
} = require("./common");
const { isUseReCaptcha } = require("../../utils");

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

  if (!chainsDef[chain]) {
    throw new HttpError(400, "Asset chain not supported");
  }

  if ("ss58Format" in chainsDef[chain]) {
    if (isNil(ss58Format)) {
      throw new HttpError(400, "Asset ss58 format is required");
    }

    if (ss58Format !== chainsDef[chain].ss58Format) {
      throw new HttpError(400, "Asset ss58Format not match");
    }
  }

  if (!symbol) {
    throw new HttpError(400, "Asset symbol is required");
  }

  if (isNil(decimals)) {
    throw new HttpError(400, "Asset decimals is required");
  }

  if (decimals <= 0) {
    throw new HttpError(400, "Asset decimals must be greater than 0");
  }

  if (isNil(votingThreshold)) {
    throw new HttpError(400, "Asset voting threshold is required");
  }

  if (votingThreshold < 0) {
    throw new HttpError(400, "Asset voting threshold can't be negative");
  }

  if (isNil(votingWeight)) {
    throw new HttpError(400, "Asset voting weight is required");
  }

  if (votingWeight < 0) {
    throw new HttpError(400, "Asset voting weight can't be negative");
  }

  if (type === "erc20" && !contract) {
    throw new HttpError(400, "Asset contract is required");
  }

  if (type === "asset" && isNil(assetId)) {
    throw new HttpError(400, "Asset id is required");
  }
}

function checkSpaceSymbol(symbol, decimals) {
  if (!symbol) {
    throw new HttpError(400, "Space symbol is required");
  }

  if (isNil(decimals)) {
    throw new HttpError(400, "Space decimals is required");
  }

  if (decimals <= 0) {
    throw new HttpError(400, "Decimals must be greater than 0");
  }
}

function checkProposalThreshold(proposalThreshold) {
  if (isNil(proposalThreshold)) {
    throw new HttpError(400, "Proposal threshold is required");
  }

  if (proposalThreshold < 0) {
    throw new HttpError(400, "Proposal threshold can't be negative");
  }
}

function checkSpaceAssets(assets) {
  if (!assets || !assets.length) {
    throw new HttpError(400, "Assets are required");
  }

  for (const asset of assets) {
    checkAssetParams(asset);
  }
}

function checkSpaceStrategy(weightStrategy) {
  if (!weightStrategy || !weightStrategy.length) {
    throw new HttpError(400, "Weight strategy is required");
  }

  for (const item of weightStrategy) {
    if (!Object.values(strategies).includes(item)) {
      throw new HttpError(400, `Invalid weight strategy: ${item}`);
    }
  }
}

async function checkSpaceParams({
  name,
  logo,
  assets,
  symbol,
  decimals,
  proposalThreshold,
  weightStrategy,
  captcha,
}) {
  checkSpaceName(name);
  checkSpaceLogo(logo);
  checkSpaceSymbol(symbol, decimals);
  checkProposalThreshold(proposalThreshold);
  checkSpaceStrategy(weightStrategy);
  checkSpaceAssets(assets);
  if (isUseReCaptcha()) {
    await checkRecaptchaResponse(captcha);
  }
}

async function createSpace(ctx) {
  await checkSpaceParams(ctx.request.body);

  const {
    name,
    logo,
    assets,
    symbol,
    decimals,
    proposalThreshold,
    weightStrategy,
  } = ctx.request.body;

  const id = slugify(name).toLowerCase();

  await checkSpaceConflict(id);

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

  const logoCid = await pinLogo(logo);

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
  await spaceCol.updateOne({ id }, { $set: spaceConfig }, { upsert: true });

  // Refresh space cache
  await reloadSpaces();

  ctx.body = {
    spaceId: id,
  };
}

module.exports = {
  createSpace,
};
