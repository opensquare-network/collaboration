const createNotification = require("./createNotification");
const createCommentNotification = require("./createCommentNotification");
const getNotifications = require("./getNotifications");
const clearUnreadNotifications = require("./clearUnreadNotifications");
const getUnreadNotificationsCount = require("./getUnreadNotificationsCount");

module.exports = {
  createNotification,
  createCommentNotification,
  getNotifications,
  clearUnreadNotifications,
  getUnreadNotificationsCount,
};
