const Router = require("koa-router");
const { getDelegators } = require("./delegation.controller");

const router = new Router();
router.get("/democracy/account/:delegatee/delegators", getDelegators);

module.exports = router;
