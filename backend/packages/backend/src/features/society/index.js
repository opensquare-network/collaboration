const Router = require("koa-router");
const { getSocietyMember } = require("./getSocietyMember");

const router = new Router();

router.get("/:network/society/members/:address", getSocietyMember);

module.exports = router;
