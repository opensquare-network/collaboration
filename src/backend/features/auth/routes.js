const Router = require("koa-router");
const authController = require("./auth.controller");
const { SupportChians } = require("../../constants");

const routeChains = SupportChians.join("|");

const router = new Router();

router.post("/auth/signup", authController.signup);
router.post("/auth/login", authController.login);
router.post("/auth/logout", authController.logout);
router.post("/auth/refresh", authController.refresh);

// router.post("/auth/verify", authController.verify);
// router.post("/auth/forget", authController.forgetPassword);
// router.post("/auth/reset", authController.resetPassword);

// router.get(
//   `/auth/login/:chain(${routeChains})/:address`,
//   authController.addressLoginStart
// );
// router.post("/auth/login/:attemptId", authController.addressLoginConfirm);

router.get("/auth/connect/:address", authController.connectStart);
router.post("/auth/connect/:attemptId", authController.connectConfirm);

module.exports = router;
