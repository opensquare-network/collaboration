const Router = require("koa-router");
const { getSocietyMember } = require("./getSocietyMember");
const { getSocietyMembersCount } = require("./getSocietyMembersCount");

const router = new Router();

router.get("/:network/society/members/count", getSocietyMembersCount);
router.get(
  "/:network/society/members/count/height/:height",
  getSocietyMembersCount,
);
router.get("/:network/society/members/:address", getSocietyMember);

module.exports = router;
