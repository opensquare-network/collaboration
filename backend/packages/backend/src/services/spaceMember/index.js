const { getSpaceMemberCollection } = require("../../mongo");

async function getSpaceMembers(space) {
  const spaceMemberCol = await getSpaceMemberCollection();
  const spaceMembers = await spaceMemberCol.find({ space }).toArray();

  return spaceMembers;
}

async function getMemberSpaces(memberPublicKey) {
  const spaceMemberCol = await getSpaceMemberCollection();
  const memberSpaces = await spaceMemberCol
    .find({ member: memberPublicKey })
    .toArray();

  return memberSpaces;
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
        joinedAt: now,
      },
      $set: {
        updatedAt: now,
      },
    },
    {
      upsert: true,
    }
  );

  return true;
}

async function removeSpaceMember(space, memberPublicKey) {
  const spaceMemberCol = await getSpaceMemberCollection();
  await spaceMemberCol.deleteOne({
    space,
    member: memberPublicKey,
  });

  return true;
}

module.exports = {
  getSpaceMembers,
  getMemberSpaces,
  addSpaceMember,
  removeSpaceMember,
};
