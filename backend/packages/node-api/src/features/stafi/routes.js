const Router = require("koa-router");
const { getTotalBalance } = require("./balance.controller");

const router = new Router();

router.get(
  "/token/:symbol/account/:account/:blockHashOrHeight?",
  getTotalBalance,
);

module.exports = router;
