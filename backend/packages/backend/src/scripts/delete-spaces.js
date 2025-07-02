const dotenv = require("dotenv");
dotenv.config();
const { getSpaceCollection } = require("../mongo");
const { logger } = require("../utils/logger");

const spaceIds = [
  "altair",
  "darwinia",
  "litentry",
  "lksm",
  "parallel",
  "dota",
  "polkaworld",
];

if (!Array.isArray(spaceIds) || spaceIds.length === 0) {
  logger.error("Please provide at least one space ID in the spaceIds array.");
  process.exit(1);
}

(async () => {
  const spaceCol = await getSpaceCollection();
  const { deletedCount } = await spaceCol.deleteMany({ id: { $in: spaceIds } });
  if (deletedCount > 0) {
    logger.info(
      `[Success] Deleted ${deletedCount} space(s): ${spaceIds.join(", ")}`,
    );
  } else {
    logger.warn(
      `[Warning] No spaces were deleted. Please check if the provided IDs exist.`,
    );
  }

  process.exit(0);
})();
