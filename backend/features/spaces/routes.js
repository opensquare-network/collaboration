const Router = require("koa-router");
const spaceController = require("./space.controller");

const router = new Router();

router.get("/spaces/:space", spaceController.getSpace);
router.get("/spaces", spaceController.getSpaces);
router.get("/spaces/:space/account/:address/balance", spaceController.getSpaceAccountBalance);
router.get("/spaces/:space/account/:address/proxies", spaceController.getSpaceAccountProxies);

module.exports = router;
