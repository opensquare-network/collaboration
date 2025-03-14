const path = require("node:path");

/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ["@osn/common-ui", "@osn/common", "@osn/rich-text-editor"],
  compiler: {
    styledComponents: {
      ssr: true,
    },
  },
  webpack(config) {
    config.module.rules.push({
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
    });

    alias("react");
    alias("styled-components");

    function alias(module) {
      config.resolve.alias[module] = path.resolve(
        __dirname,
        "node_modules",
        module,
      );
    }

    return config;
  },
};
