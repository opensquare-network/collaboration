const BigNumber = require("bignumber.js");
const { getLatestHeight } = require("../../services/chain.service");
const { getProposalCollection } = require("../../mongo");
const spaceServices = require("../../spaces");
const { WeightStrategy } = require("../../constants");
const { getBlockHash } = require("../../utils/polkadotApi");

const SPACES = Object.keys(spaceServices).reduce((spaces, space) => {
  const spaceService = spaceServices[space];
  spaces[space] = {
    symbol: spaceService.symbol,
    network: spaceService.network,
    ss58Format: spaceService.ss58Format,
    decimals: spaceService.decimals,
    proposeThreshold: spaceService.proposeThreshold,
    weightStrategy: spaceService.weightStrategy,
  };
  return spaces;
}, {});

async function getSpaces(ctx) {
  const now = Date.now();
  const proposalCol = await getProposalCollection();
  const activeStats = await proposalCol.aggregate(
    [
      {
        $match: {
          startDate: { $lte: now },
          endDate: { $gt: now },
        }
      },
      {
        $group: {
          _id: "$space",
          count: { $sum: 1 }
        }
      }
    ]).toArray();

  const result = Object.keys(SPACES).reduce(
    (res, key) => {
      res[key] = { ...SPACES[key], activeProposalsCount: 0 };
      return res;
    },
    {}
  );

  for (const item of activeStats) {
    const space = result[item._id];
    if (space) {
      space.activeProposalsCount = item.count;
    }
  }

  ctx.body = result;
}

async function getSpace(ctx) {
  const { space } = ctx.params;
  ctx.body = {
    ...SPACES[space],
    latestFinalizedHeight: getLatestHeight(space),
  };
}

async function getSpaceAccountBalance(ctx) {
  const { space, address } = ctx.params;
  const { snapshot } = ctx.query;
  const spaceService = spaceServices[space];
  const api = await spaceService.getApi();
  const blockHeight = snapshot ? parseInt(snapshot) : getLatestHeight(space);
  const blockHash = await getBlockHash(api, blockHeight);
  const balanceOf = await spaceService.balanceOf(api, blockHash, address);

  let result = balanceOf;
  if (spaceService.weightStrategy === WeightStrategy.BalanceOf) {
    // do noting
  } else if (spaceService.weightStrategy === WeightStrategy.SqrtOfBalanceOf) {
    result = new BigNumber(balanceOf).sqrt().toString();
  }

  ctx.body = result;
}

async function getSpaceAccountProxies(ctx) {
  const { space, address } = ctx.params;
  const { snapshot } = ctx.query;
  const spaceService = spaceServices[space];
  const api = await spaceService.getApi();
  const blockHeight = snapshot ? parseInt(snapshot) : getLatestHeight(space);
  const blockHash = await getBlockHash(api, blockHeight);
  const data = await api.query.proxy.proxies.at(blockHash, address);
  const [proxies] = data.toJSON() || [];

  ctx.body = (proxies || [])
    .filter(item => {
      if (![
        "Any",
        "NonTransfer",
        "Governance",
      ].includes(item.proxyType)) {
        return false;
      }

      return true;
    })
    .map(item => item.delegate);
}

module.exports = {
  getSpace,
  getSpaces,
  getSpaceAccountBalance,
  getSpaceAccountProxies,
}
