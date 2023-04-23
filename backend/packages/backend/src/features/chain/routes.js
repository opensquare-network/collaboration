const Router = require("koa-router");
const chainController = require("./chain.controller");
const { getOrmlTokens } = require("./ormlTokens");

const router = new Router();

router.get("/chain/:chain/height", chainController.getHeight);
router.get("/chain/:chain/ormltokens", getOrmlTokens);

module.exports = router;
