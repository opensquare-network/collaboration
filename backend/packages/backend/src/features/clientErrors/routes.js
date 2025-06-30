const Router = require("koa-router");
const { clientErrors } = require("./controller");

const router = new Router();

router.post("/client-errors", clientErrors);

module.exports = router;
