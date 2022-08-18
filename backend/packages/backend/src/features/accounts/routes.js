const Router = require("koa-router");
const accountController = require("./account.controller");

const router = new Router();

router.get(
  "/:network/account/:address/balance",
  accountController.getSpaceAccountBalance
);

module.exports = router;
