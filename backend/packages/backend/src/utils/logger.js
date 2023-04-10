const log4js = require("log4js");

const logLevel = process.env.LOG_LEVEL || "debug";
const isProduction = process.env.NODE_ENV === "production";

const backendFileCategory = "backend";

log4js.configure({
  appenders: {
    [backendFileCategory]: { type: "file", filename: "log/backend.log" },
    errorFile: {
      type: "file",
      filename: "log/errors.log",
    },
    errors: {
      type: "logLevelFilter",
      level: "ERROR",
      appender: "errorFile",
    },
    out: { type: "stdout" },
  },
  categories: {
    default: {
      appenders: [isProduction ? backendFileCategory : "out", "errors"],
      level: logLevel,
    },
  },
});

const logger = log4js.getLogger(backendFileCategory);

module.exports = {
  logger,
};
