const multer = require("@koa/multer");
const Router = require("koa-router");
const fileController = require("./file.controller");

const router = new Router();
const upload = multer();

router.post("/ipfs/files", upload.single("banner"), fileController.upload);
router.get("/ipfs/files/:hash", fileController.getFile);
router.get("/ipfs/endpoint", fileController.getIpfsEndpoint);

module.exports = router;
