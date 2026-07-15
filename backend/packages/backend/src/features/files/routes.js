const multer = require("@koa/multer");
const Router = require("koa-router");
const fileController = require("./file.controller");

const router = new Router();
const upload = multer();

router.post("/s3/files", upload.single("banner"), fileController.uploadFile);
router.get("/s3/files/:cid", fileController.getS3File);
router.get("/s3/endpoint", fileController.getS3Endpoint);

module.exports = router;
