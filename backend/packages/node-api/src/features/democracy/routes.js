const Router = require("koa-router");
const { getDelegators } = require("./controllers/getDelegators");
const { getDelegatee } = require("./controllers/getDelegatee");

const router = new Router();
router.get("/democracy/account/:delegatee/delegators", getDelegators);
router.get("/democracy/account/:delegator/delegatee", getDelegatee);

module.exports = router;
