const mongodb = require("mongodb");
const { getNotificationCollection } = require("../../mongo");
const { toPublicKey } = require("../../utils");

async function clearUnreadNotifications(address, items) {
  const owner = toPublicKey(address);
  const q = {
    owner,
    read: false,
  };

  if (Array.isArray(items)) {
    q._id = { $in: items.map(item => new mongodb.ObjectId(item)) };
  }

  const notificationCol = await getNotificationCollection();
  const result = await notificationCol.updateMany(q, { $set: { read: true } });
  return {
    result,
  };
}

module.exports = clearUnreadNotifications;
