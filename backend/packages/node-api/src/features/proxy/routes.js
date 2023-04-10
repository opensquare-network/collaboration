const Router = require("koa-router");
const proxyController = require("./proxy.controller");

const router = new Router();

router.get(
  "/proxy/:delegator/:delegatee/:blockHashOrHeight?",
  proxyController.getProxyRelationship,
);

module.exports = router;
