module.exports = {
  webpack(config) {
    config.module.rules.push(
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: [
          "@svgr/webpack",
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
};
