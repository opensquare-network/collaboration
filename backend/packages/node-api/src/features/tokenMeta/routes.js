const Router = require("koa-router");
const { getTokenMetadata } = require("./getTokenMetadata");
const { getNativeTokenInfo } = require("./getNativeTokenInfo");

const router = new Router();

router.get("/token/native/metadata", getNativeTokenInfo);
router.get("/token/id/:assetId/metadata", getTokenMetadata);

module.exports = router;
