const { getNotificationCollection } = require("../../mongo");
const { extractMentionUsers } = require("../../utils/comment");
const { logger } = require("../../utils/logger");

async function createMentionNotification(type, content, contentType, data) {
  try {
    const { space, proposalCid, title } = data;
    const memberPublicKeys = await extractMentionUsers(content, contentType);

    const createdAt = new Date().getTime();

    const notificationCol = await getNotificationCollection();
    await notificationCol.insertMany(
      memberPublicKeys.map((memberPublicKey) => ({
        owner: memberPublicKey,
        type,
        read: false,
        data: { space, proposalCid, title, content, contentType },
        createdAt,
      })),
    );
  } catch (error) {
    logger.error(
      `Failed to create notification for notificationType: ${type}, error: ${error.message}`,
    );
  }
}

module.exports = createMentionNotification;
