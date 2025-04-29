const { getLatestHeight } = require("./chain.service");
const { getProposalCollection, getSpaceMemberCollection } = require("../mongo");
const { spaces: spaceServices } = require("../spaces");

async function getSpaces() {
  const now = Date.now();
  const proposalCol = await getProposalCollection();
  const activeProposalStats = await proposalCol
    .aggregate([
      {
        $match: {
          startDate: { $lte: now },
          endDate: { $gt: now },
          terminated: null,
        },
      },
      {
        $group: {
          _id: "$space",
          count: { $sum: 1 },
        },
      },
    ])
    .toArray();

  const totalProposalStats = await proposalCol
    .aggregate([
      {
        $group: {
          _id: "$space",
          count: { $sum: 1 },
        },
      },
    ])
    .toArray();

  const result = Object.keys(spaceServices).reduce((res, key) => {
    res[key] = {
      ...spaceServices[key],
      activeProposalsCount: 0,
      proposalsCount: 0,
    };
    return res;
  }, {});

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

  const sortedSpaces = Object.values(result)
    .sort((a, b) => {
      return b.proposalsCount - a.proposalsCount;
    })
    .filter((item) => item.offline !== true);

  return sortedSpaces;
}

async function getSpace(space) {
  const spaceService = spaceServices[space];
  if (!spaceService) {
    return null;
  }

  const latestFinalizedHeights = Object.fromEntries(
    await Promise.all(
      (spaceService.networks || []).map(async (network) => [
        network.network,
        await getLatestHeight(network.network),
      ]),
    ),
  );

  return {
    ...spaceService,
    latestFinalizedHeights,
  };
}

async function getSpaceMembers(space) {
  const spaceMemberCol = await getSpaceMemberCollection();
  const members = await spaceMemberCol.find({ space }).toArray();

  return members;
}

async function addSpaceMember(space, memberPublicKey) {
  const spaceMemberCol = await getSpaceMemberCollection();
  const now = new Date();

  await spaceMemberCol.updateOne(
    {
      space,
      member: memberPublicKey,
    },
    {
      $setOnInsert: {
        createdAt: now,
      },
      $set: {
        updatedAt: now,
      },
    },
    {
      upsert: true,
    },
  );
}

async function removeSpaceMember(space, memberPublicKey) {
  const spaceMemberCol = await getSpaceMemberCollection();
  await spaceMemberCol.deleteOne({
    space,
    member: memberPublicKey,
  });
}

module.exports = {
  getSpace,
  getSpaces,
  getSpaceMembers,
  addSpaceMember,
  removeSpaceMember,
};
