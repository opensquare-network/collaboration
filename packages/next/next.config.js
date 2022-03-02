module.exports = {
  webpack(config) {
    config.module.rules.push(
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
      {
        test: /\/common\/.*\.js/,
        use: "babel-loader",
      }
    );
    return config;
  },
};
