const Router = require("koa-router");
const balanceController = require("./balance.controller");
const tokenBalanceController = require("./token.balance.controller");

const router = new Router();

router.get("/balance/:account/:blockHashOrHeight?", balanceController.getTotalBalance);
router.get(
  "/token_balance/:symbol/:account/:blockHashOrHeight?",
  tokenBalanceController.getTokenBalance
)

module.exports = router;
