const withTM = require("next-transpile-modules")(["@osn/common-ui"]);

module.exports = withTM({
  webpack(config) {
    config.module.rules.push(
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              prettier: false,
              svgo: false,
              svgoConfig: {
                plugins: [{ removeViewBox: false }],
              },
              titleProp: true,
              ref: true,
            },
          },
          {
            loader: "file-loader",
            options: {
              name: "static/media/[name].[hash].[ext]",
            },
          },
        ],
      },
      {
        test: /\/common\/.*\.js/,
        use: "babel-loader",
      }
    );
    return config;
  },
});
