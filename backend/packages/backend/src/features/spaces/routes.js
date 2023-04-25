const Router = require("koa-router");
const spaceController = require("./space.controller");
const { createSpace } = require("./createSpace");

const router = new Router();

router.get("/networks", spaceController.getAllNetworks);
router.get("/spaces", spaceController.getSpaces);
router.get("/spaces/:space", spaceController.getSpace);
router.post("/spaces", createSpace);

module.exports = router;
