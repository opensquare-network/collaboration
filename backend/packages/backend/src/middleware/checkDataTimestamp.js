const fiveMinutesInSeconds = 5 * 60;

async function checkDataTimestamp(ctx, next) {
  const {
    data: { timestamp },
  } = ctx.request.body;

  if (!timestamp) {
    throw new Error("Timestamp is missing");
  }

  // Check whether the timestamp is within a reasonable range from the current time.
  const currentTime = Math.floor(Date.now() / 1000);
  if (Math.abs(currentTime - timestamp) > fiveMinutesInSeconds) {
    throw new Error("Invalid timestamp");
  }

  await next();
}

module.exports = checkDataTimestamp;
