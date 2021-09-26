const Router = require("koa-router");
const spaceController = require("./space.controller");

const router = new Router();

router.get("/spaces", spaceController.getSpaces);

module.exports = router;
