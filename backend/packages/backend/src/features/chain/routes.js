const Router = require("koa-router");
const chainController = require("./chain.controller");
const { getTokensDefinition } = require("./chainTokens");
const { getChainsDefinition } = require("./chains");

const router = new Router();

router.get("/chain/:chain/height", chainController.getHeight);
router.get("/tokens/definition", getTokensDefinition);
router.get("/chains/definition", getChainsDefinition);

module.exports = router;
