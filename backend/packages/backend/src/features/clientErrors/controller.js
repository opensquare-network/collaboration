const { HttpError } = require("../../exc");

const errorReportWebhookUrl = process.env.ERROR_REPORT_FEISHU_WEBHOOK_URL;

async function clientErrors(ctx) {
  if (!errorReportWebhookUrl) {
    throw new HttpError(500, "ERROR_REPORT_FEISHU_WEBHOOK_URL is not set");
  }

  const body = ctx.request.body;
  try {
    await fetch(errorReportWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    ctx.body = {
      success: true,
    };
  } catch (error) {
    throw new HttpError(500, error.message);
  }
}

module.exports = {
  clientErrors,
};
