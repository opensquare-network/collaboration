const Router = require("koa-router");
const { getTokenMetadata } = require("./getTokenMetadata");
const { getContractMetadata } = require("./getContractMetadata");
const { getNativeTokenMetadata } = require("./getNativeTokenMetadata");

const router = new Router();

router.get("/chain/:chain/token/native", getNativeTokenMetadata);
router.get("/chain/:chain/token/id/:assetId", getTokenMetadata);
router.get("/evm/chain/:chain/contract/:contractAddress", getContractMetadata);

module.exports = router;
