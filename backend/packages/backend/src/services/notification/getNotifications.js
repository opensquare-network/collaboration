const {
  getNotificationCollection,
  getSpaceCollection,
} = require("../../mongo");
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

  const spaceCol = await getSpaceCollection();
  for (const item of items) {
    item.data.space = await spaceCol.findOne({ id: item.data.space });
  }

  return {
    items,
    page,
    pageSize,
    total,
  };
}

module.exports = getNotifications;
