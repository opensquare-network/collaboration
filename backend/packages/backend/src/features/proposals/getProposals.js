const {
  queryProposals,
} = require("../../services/proposal.service/proposalQuery");
const { extractPage } = require("../../utils");

async function getProposals(ctx) {
  const { space } = ctx.params;

  const { page, pageSize } = extractPage(ctx);
  if (pageSize === 0 || page < 1) {
    ctx.status = 400;
    return;
  }

  const q = { space };
  ctx.body = await queryProposals(
    q,
    { terminatedOrEndedAt: -1 },
    page,
    pageSize,
  );
}

async function getPendingProposals(ctx) {
  const { space } = ctx.params;

  const { page, pageSize } = extractPage(ctx);
  if (pageSize === 0 || page < 1) {
    ctx.status = 400;
    return;
  }

  const now = Date.now();
  const q = {
    space,
    startDate: { $gt: now },
    terminated: null,
  };

  ctx.body = await queryProposals(q, { startDate: 1 }, page, pageSize);
}

async function getActiveProposals(ctx) {
  const { space } = ctx.params;

  const { page, pageSize } = extractPage(ctx);
  if (pageSize === 0 || page < 1) {
    ctx.status = 400;
    return;
  }

  const now = Date.now();
  const q = {
    space,
    startDate: { $lte: now },
    endDate: { $gt: now },
    terminated: null,
  };

  ctx.body = await queryProposals(q, { endDate: 1 }, page, pageSize);
}

async function getClosedProposals(ctx) {
  const { space } = ctx.params;

  const { page, pageSize } = extractPage(ctx);
  if (pageSize === 0 || page < 1) {
    ctx.status = 400;
    return;
  }

  const now = Date.now();
  const q = {
    space,
    $or: [{ endDate: { $lte: now } }, { terminated: { $ne: null } }],
  };

  ctx.body = await queryProposals(
    q,
    { terminatedOrEndedAt: -1 },
    page,
    pageSize,
  );
}

module.exports = {
  getProposals,
  getPendingProposals,
  getActiveProposals,
  getClosedProposals,
};
