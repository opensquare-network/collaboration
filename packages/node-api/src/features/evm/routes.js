const Router = require("koa-router");
const erc20Controller = require("./erc20.controller");

const router = new Router();

router.get(
  "/contract/:contract/address/:address/height/:blockHeight",
  erc20Controller.getBalance
);

module.exports = router;
