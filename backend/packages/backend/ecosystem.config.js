module.exports = {
  apps: [
    {
      name: "voting-save-to-s3",
      script: "src/scripts/save-to-s3.js",
      log_date_format: "YYYY-MM-DD HH:mm Z",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
