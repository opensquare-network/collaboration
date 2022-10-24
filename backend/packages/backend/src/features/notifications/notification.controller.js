const notificationService = require("../../services/notification");
const { extractPage } = require("../../utils");

async function getNotifications(ctx) {
  const { address } = ctx.params;
  const { page, pageSize } = extractPage(ctx);
  if (pageSize === 0 || page < 1) {
    ctx.status = 400;
    return;
  }

  ctx.body = await notificationService.getNotifications(address, page, pageSize);
}

async function getUnreadNotificationsCount(ctx) {
  const { address } = ctx.params;

  const result = await notificationService.getUnreadNotificationsCount(address);

  ctx.body = result;
}

async function clearUnreadNotifications(ctx) {
  const { address } = ctx.params;
  const { items } = ctx.request.body;

  const result = await notificationService.clearUnreadNotifications(address, items);

  ctx.body = result;
}

module.exports = {
  getNotifications,
  getUnreadNotificationsCount,
  clearUnreadNotifications,
};
