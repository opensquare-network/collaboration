const Router = require("koa-router");
const issuanceController = require("./issuance.controller");

const router = new Router();

router.get(
  "/token/:token/:blockHashOrHeight?",
  issuanceController.getTotalIssuance,
);

module.exports = router;
