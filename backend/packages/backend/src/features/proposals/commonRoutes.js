const Router = require("koa-router");
const proposalController = require("./proposal.controller");

const router = new Router();
router.get("/proposal/:proposalId", proposalController.getProposalById);

module.exports = router;
