const { getNotificationCollection } = require("../../mongo");
const { toPublicKey } = require("../../utils");

async function getUnreadNotificationsCount(address) {
  const owner = toPublicKey(address);
  const q = {
    owner,
    read: false,
  };

  const notificationCol = await getNotificationCollection();
  const count = await notificationCol.countDocuments(q);
  return {
    count,
  };
}

module.exports = getUnreadNotificationsCount;
