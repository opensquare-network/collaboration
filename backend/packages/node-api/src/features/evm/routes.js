const Router = require("koa-router");
const erc20Controller = require("./erc20.controller");
const { getTargetHeight } = require("./height.controller");
const { getContractMetadata } = require("./getContractMetadata");
const stellaswapController = require("./stellaswap.controller");

const router = new Router();

router.get(
  "/stellaswap/contract/:contract/address/:address/height/:blockHeight",
  stellaswapController.getBalance,
);

router.get(
  "/erc20/contract/:contract/address/:address/height/:blockHeight",
  erc20Controller.getBalance,
);

router.get("/erc20/contract/:contract/metadata", getContractMetadata);

router.get("/height/:timestamp?", getTargetHeight);

module.exports = router;
