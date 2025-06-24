const Router = require("koa-router");
const { getAllNetworks } = require("./getAllNetworks");
const { getSpaces } = require("./getSpaces");
const { getSpace } = require("./getSpace");
const { updateSpace } = require("./updateSpace");
const { createSpace } = require("./createSpace");
const { createDaoSpace } = require("./createDaoSpace");
const { updateSpaceMembers } = require("./updateSpaceMembers");
const { updateSpaceAdmins } = require("./updateSpaceAdmins");
const requireSignature = require("../../middleware/require-signature");

const router = new Router();

router.get("/networks", getAllNetworks);
router.get("/spaces", getSpaces);
router.get("/spaces/:space", getSpace);
router.patch("/spaces/:space", requireSignature, updateSpace);
router.post("/spaces", createSpace);
router.post("/spaces/collectives", createDaoSpace);
router.post("/spaces/:space/members", requireSignature, updateSpaceMembers);
router.post("/spaces/:space/admins", requireSignature, updateSpaceAdmins);

module.exports = router;
