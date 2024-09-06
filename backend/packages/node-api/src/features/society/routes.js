const Router = require("koa-router");
const { getSocietyMembers } = require("./getSocietyMembers");
const { getSocietyMember } = require("./getSocietyMember");
const { getSocietyMembersCount } = require("./getSocietyMembersCount");

const router = new Router();
router.get("/society/members", getSocietyMembers);
router.get("/society/members/height/:blockHashOrHeight?", getSocietyMembers);
router.get("/society/members/count", getSocietyMembersCount);
router.get(
  "/society/members/count/height/:blockHashOrHeight?",
  getSocietyMembersCount,
);
router.get("/society/members/:address", getSocietyMember);
router.get(
  "/society/members/:address/height/:blockHashOrHeight?",
  getSocietyMember,
);

module.exports = router;
