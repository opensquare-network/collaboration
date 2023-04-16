const Router = require("koa-router");
const { getNativeTokenMetadata } = require("./getTokenMetadata");

const router = new Router();

router.get("/chain/:chain/token/native/metadata", getNativeTokenMetadata);

module.exports = router;
