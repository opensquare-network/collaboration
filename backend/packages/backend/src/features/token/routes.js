const Router = require("koa-router");
const { getTokenMetadata } = require("./getTokenMetadata");
const { getContractMetadata } = require("./getContractMetadata");

const router = new Router();

router.get("/chain/:chain/token/:assetId", getTokenMetadata);
router.get("/evm/chain/:chain/contract/:contractAddress", getContractMetadata);

module.exports = router;
