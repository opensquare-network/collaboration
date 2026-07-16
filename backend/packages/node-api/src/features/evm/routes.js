const Router = require("koa-router");
const erc20Controller = require("./erc20.controller");
const { getTargetHeight } = require("./height.controller");
const { getContractMetadata } = require("./getContractMetadata");
const { getNativeBalance } = require("./getNativeBalance");

const router = new Router();

router.get(
  "/erc20/contract/:contract/address/:address/height/:blockHeight",
  erc20Controller.getBalance,
);

router.get("/erc20/contract/:contract/metadata", getContractMetadata);

router.get("/native/address/:address/height/:blockHeight", getNativeBalance);

router.get("/height/:timestamp?", getTargetHeight);

module.exports = router;
