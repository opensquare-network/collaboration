const { HttpError } = require("../../exc");
const spaceMemberService = require("../../services/spaceMember");
const { toPublicKey } = require("../../utils");

async function getJoinedSpaces(ctx) {
  const { address } = ctx.params;

  const memberPublicKey = toPublicKey(address);
  ctx.body = await spaceMemberService.getMemberSpaces(memberPublicKey);
}

async function joinSpace(ctx) {
  const { address } = ctx.params;
  const { space } = ctx.request.body;

  if (!space) {
    throw new HttpError(400, `Space is missing`);
  }

  const memberPublicKey = toPublicKey(address);
  const result = await spaceMemberService.addSpaceMember(space, memberPublicKey);

  ctx.body = { result };
}

async function leaveSpace(ctx) {
  const { address, space } = ctx.params;

  const memberPublicKey = toPublicKey(address);
  const result = await spaceMemberService.removeSpaceMember(space, memberPublicKey);

  ctx.body = { result }
}

module.exports = {
  getJoinedSpaces,
  joinSpace,
  leaveSpace,
};
