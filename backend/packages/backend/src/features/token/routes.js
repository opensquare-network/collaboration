const Router = require("koa-router");
const { getTokenMetadata } = require("./getTokenMetadata");

const router = new Router();

router.get("/chain/:chain/token/:assetId", getTokenMetadata);

module.exports = router;
