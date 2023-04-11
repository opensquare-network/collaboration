const Router = require("koa-router");
const { getDelegators, getDelegatee } = require("./delegation.controller");

const router = new Router();
router.get("/democracy/account/:delegatee/delegators", getDelegators);
router.get("/democracy/account/:delegator/delegatee", getDelegatee);

module.exports = router;
