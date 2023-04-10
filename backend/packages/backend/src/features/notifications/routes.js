const Router = require("koa-router");
const notificationController = require("./notification.controller");

const router = new Router();

router.get(
  "/account/:address/notifications",
  notificationController.getNotifications
);

router.get(
  "/account/:address/notifications/unread",
  notificationController.getUnreadNotificationsCount
);

router.post(
  "/account/:address/notifications/clearunread",
  notificationController.clearUnreadNotifications
);

module.exports = router;
