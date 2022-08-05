const multer = require("@koa/multer");
const Router = require("koa-router");
const fileController = require("./file.controller");

const router = new Router();
const upload = multer();

router.post("/files/upload", upload.single("banner"), fileController.upload);
router.get("/files/ipfs/:hash", fileController.getFile);
router.get("/files/ipfs", fileController.getIpfsEndpoint);

module.exports = router;
