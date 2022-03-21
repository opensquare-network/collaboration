const { getLatestHeight } = require("./chain.service");
const { getProposalCollection } = require("../mongo");
const { spaces: spaceServices } = require("../spaces");
const { getApi, getFinalizedHeightFromTime } = require("./node.service");
const { HttpError } = require("../exc");

async function getSpaces() {
  const now = Date.now();
  const proposalCol = await getProposalCollection();
  const activeProposalStats = await proposalCol.aggregate(
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

  const totalProposalStats = await proposalCol.aggregate(
    [
      {
        $group: {
          _id: "$space",
          count: { $sum: 1 }
        }
      }
    ]).toArray();

  const result = Object.keys(spaceServices).reduce(
    (res, key) => {
      res[key] = {
        ...spaceServices[key],
        activeProposalsCount: 0,
        proposalsCount: 0,
      };
      return res;
    },
    {}
  );

  for (const item of activeProposalStats) {
    const space = result[item._id];
    if (space) {
      space.activeProposalsCount = item.count;
    }
  }

  for (const item of totalProposalStats) {
    const space = result[item._id];
    if (space) {
      space.proposalsCount = item.count;
    }
  }

  return result;
}

async function getSpace(space) {
  const spaceService = spaceServices[space];
  if (!spaceService) {
    return null;
  }

  const latestFinalizedHeights = Object.fromEntries((spaceService.networks || []).map(
    network => [
      network.network,
      getLatestHeight(network.network),
    ]
  ));

  return {
    ...spaceService,
    latestFinalizedHeights,
  };
}

async function getSpaceNetworkHeights(space, time) {
  const spaceService = spaceServices[space];
  if (!spaceService) {
    return null;
  }

  const heights = await Promise.all(
    (spaceService.networks || []).map(async (network) => {
      const api = await getApi(network.network);
      try {
        const result = await getFinalizedHeightFromTime(api, time);
        return [network.network, result];
      } catch (err) {
        throw new HttpError(500, `Failed to get ${network.network} block height from time: ${err.message}`);
      }
    })
  );

  return Object.fromEntries(heights);
}

module.exports = {
  getSpace,
  getSpaces,
  getSpaceNetworkHeights,
}
