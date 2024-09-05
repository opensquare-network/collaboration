const Router = require("koa-router");
const { getSocietyMembers } = require("./getSocietyMembers");
const { getSocietyMember } = require("./getSocietyMember");

const router = new Router();
router.get(
  "/society/members/:address/height/:blockHashOrHeight?",
  getSocietyMember,
);
router.get("/society/members/:address", getSocietyMember);
router.get("/society/members/height/:blockHashOrHeight?", getSocietyMembers);
router.get("/society/members", getSocietyMembers);

module.exports = router;
