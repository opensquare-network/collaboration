const Router = require("koa-router");
const { getSocietyMembers } = require("./getSocietyMembers");

const router = new Router();
router.get("/society/members/height/:blockHashOrHeight?", getSocietyMembers);

module.exports = router;
