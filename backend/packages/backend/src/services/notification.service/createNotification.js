const { getNotificationCollection } = require("../../mongo");
const { toPublicKey } = require("../../utils");

async function createNotification(receiver, type, data) {
  const owner = toPublicKey(receiver);
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

module.exports = createNotification;
