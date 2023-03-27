const Router = require("koa-router");
const memberController = require("./space-members.controller");

const router = new Router();

router.get("/account/:address/spaces", memberController.getJoinedSpaces);
router.post("/account/:address/spaces", memberController.joinSpace);
router.delete("/account/:address/spaces/:space", memberController.leaveSpace);

module.exports = router;
