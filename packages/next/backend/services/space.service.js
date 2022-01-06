const { getLatestHeight } = require("./chain.service");
const { getProposalCollection } = require("../mongo");
const { spaces: spaceServices } = require("../spaces");

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

  const result = Object.keys(spaceServices).reduce(
    (res, key) => {
      res[key] = { ...spaceServices[key], activeProposalsCount: 0 };
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
  const spaceService = spaceServices[space];
  if (!spaceService) {
    return null;
  }

  return {
    ...spaceServices[space],
    latestFinalizedHeight: getLatestHeight(space),
  };
}

module.exports = {
  getSpace,
  getSpaces,
}
