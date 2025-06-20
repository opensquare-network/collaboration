const Router = require("koa-router");
const spaceController = require("./space.controller");
const { createSpace } = require("./createSpace");
const { createDaoSpace } = require("./createDaoSpace");
const { updateSpaceMembers } = require("./updateSpaceMembers");
const { updateSpaceAdmins } = require("./updateSpaceAdmins");
const requireSignature = require("../../middleware/require-signature");

const router = new Router();

router.get("/networks", spaceController.getAllNetworks);
router.get("/spaces", spaceController.getSpaces);
router.get("/spaces/:space", spaceController.getSpace);
router.post("/spaces", createSpace);
router.post("/spaces/collectives", createDaoSpace);
router.post("/spaces/:space/members", requireSignature, updateSpaceMembers);
router.post("/spaces/:space/admins", requireSignature, updateSpaceAdmins);

module.exports = router;
