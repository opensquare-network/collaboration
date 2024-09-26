const Router = require("koa-router");
const erc20Controller = require("./erc20.controller");
const { getTargetHeight } = require("./height.controller");
const { getContractMetadata } = require("./getContractMetadata");
const stellaswapController = require("./stellaswap.controller");
const { getNativeBalance } = require("./getNativeBalance");

const router = new Router();

router.get(
  "/stellaswap_staking/address/:address/height/:blockHeight",
  stellaswapController.getBalance,
);

router.get(
  "/erc20/contract/:contract/address/:address/height/:blockHeight",
  erc20Controller.getBalance,
);

router.get("/erc20/contract/:contract/metadata", getContractMetadata);

router.get("/native/address/:address/height/:blockHeight", getNativeBalance);

router.get("/height/:timestamp?", getTargetHeight);

module.exports = router;
