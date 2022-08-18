const Router = require("koa-router");
const tokenController = require("./token.controller");

const router = new Router();

router.get(
  "/token/:assetId/account/:account/:blockHashOrHeight?",
  tokenController.getTotalBalance
);

module.exports = router;
