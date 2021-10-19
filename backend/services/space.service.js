const { getLatestHeight } = require("./chain.service");
const { getProposalCollection } = require("../mongo");
const spaceServices = require("../spaces");

const SPACES = Object.keys(spaceServices).reduce((spaces, space) => {
  const spaceService = spaceServices[space];
  spaces[space] = {
    symbol: spaceService.symbol,
    network: spaceService.network,
    ss58Format: spaceService.ss58Format,
    decimals: spaceService.decimals,
    relay: spaceService.relay,
    proposeThreshold: spaceService.proposeThreshold,
    weightStrategy: spaceService.weightStrategy,
  };
  return spaces;
}, {});

async function getSpaces() {
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

  return result;
}

async function getSpace(space) {
  return {
    ...SPACES[space],
    latestFinalizedHeight: getLatestHeight(space),
  };
}

module.exports = {
  getSpace,
  getSpaces,
}
