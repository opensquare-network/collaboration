const Router = require("koa-router");
const { getNativeTokenInfo } = require("./getNativeTokenInfo");

const router = new Router();

router.get("/token/native/metadata", getNativeTokenInfo);

module.exports = router;
