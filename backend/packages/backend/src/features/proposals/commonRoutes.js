const Router = require("koa-router");
const { getProposalById } = require("./getProposalById");
const { getUserVotesOfProposals } = require("./getUserVotesOfProposals");

const router = new Router();
router.get("/proposal/:proposalId", getProposalById);
router.get("/votes", getUserVotesOfProposals);

module.exports = router;
