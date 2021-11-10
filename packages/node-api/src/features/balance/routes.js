const Router = require("koa-router");
const balanceController = require("./balance.controller");

const router = new Router();

router.get("/balance/:account/:blockHashOrHeight?", balanceController.getTotalBalance);

module.exports = router;
