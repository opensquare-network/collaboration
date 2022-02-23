const Router = require("koa-router");
const spaceController = require("./space.controller");

const router = new Router();

router.get("/spaces/:space/networkheights", spaceController.getNetworkHeights);
router.get("/spaces/:space", spaceController.getSpace);
router.get("/spaces", spaceController.getSpaces);

module.exports = router;
