const withTM = require("next-transpile-modules")(["common"]);

module.exports = {
  ...withTM(),
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
