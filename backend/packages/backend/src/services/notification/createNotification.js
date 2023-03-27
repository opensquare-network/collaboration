const { getNotificationCollection } = require("../../mongo");

async function createNotification(receiver, type, data) {
  const createdAt = new Date().getTime();

  const notificationCol = await getNotificationCollection();
  await notificationCol.insertOne({
    receiver,
    type,
    read: false,
    data,
    createdAt,
  });
}

module.exports = createNotification;
