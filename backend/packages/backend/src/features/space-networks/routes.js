const Router = require("koa-router");
const networkController = require("./space-networks.controller");

const router = new Router();

router.get("/networkheights", networkController.getNetworkHeights);

module.exports = router;
