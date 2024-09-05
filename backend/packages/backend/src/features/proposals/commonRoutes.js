const Router = require("koa-router");
const { getProposalById } = require("./getProposalById");

const router = new Router();
router.get("/proposal/:proposalId", getProposalById);

module.exports = router;
