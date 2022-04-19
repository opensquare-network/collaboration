module.exports = {
  webpack(config) {
    config.module.rules.push(
      { test: /\.svg$/, use: ["@svgr/webpack", "file-loader"] },
      {
        test: /\/common\/.*\.js/,
        use: "babel-loader",
      }
    );
    return config;
  },
};
