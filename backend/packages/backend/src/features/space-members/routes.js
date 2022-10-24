const Router = require("koa-router");
const memberController = require("./space-members.controller");

const router = new Router();

router.get("/account/:address/joined-spaces", memberController.getJoinedSpaces);
router.post("/account/:address/joined-spaces", memberController.joinSpace);
router.delete("/account/:address/joined-spaces/:space", memberController.leaveSpace);

module.exports = router;
