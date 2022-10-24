const { getNotificationCollection } = require("../../mongo");
const { toPublicKey } = require("../../utils");

async function getNotifications(address, page, pageSize) {
  const owner = toPublicKey(address);
  const q = { owner };

  const notificationCol = await getNotificationCollection();
  const total = await notificationCol.countDocuments(q);
  const items = await notificationCol
    .find(q)
    .sort({ createdAt: -1 })
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .toArray();

  return {
    items,
    page,
    pageSize,
    total,
  };
}

module.exports = getNotifications;
