module.exports = {
  apps: [
    {
      name: "voting-pin-to-ipfs",
      script: "src/scripts/pin-to-ipfs.js",
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
