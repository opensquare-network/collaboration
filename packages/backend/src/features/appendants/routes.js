const Router = require("koa-router");
const appendantController = require("./appendant.controller");
const requireSignature = require("../../middleware/require-signature");

const router = new Router();

router.post("/appendants", requireSignature, appendantController.addAppendant);

module.exports = router;
