const Router = require("koa-router");
const chainController = require("./chain.controller");

const router = new Router();

router.get("/chain/:chain/height", chainController.getHeight);

module.exports = router;
