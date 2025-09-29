const { getNotificationCollection } = require("../../mongo");

async function createCommentNotification(owner, type, data) {
  const createdAt = new Date().getTime();

  const notificationCol = await getNotificationCollection();
  await notificationCol.insertOne({
    owner,
    type,
    read: false,
    data,
    createdAt,
  });
}

module.exports = createCommentNotification;
