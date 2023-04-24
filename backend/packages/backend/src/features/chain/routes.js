const Router = require("koa-router");
const chainController = require("./chain.controller");
const { getChainTokens } = require("./chainTokens");

const router = new Router();

router.get("/chain/:chain/height", chainController.getHeight);
router.get("/chain/:chain/tokens/:type", getChainTokens);

module.exports = router;
