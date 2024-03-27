module.exports = {
  extends: ["next/core-web-vitals", "@osn", "../.eslintrc.js"],
  parserOptions: {
    babelOptions: {
      presets: [require.resolve("next/babel")],
    },
  },
  rules: {
    "@next/next/no-img-element": "off",
    "jsx-a11y/alt-text": "off",
  },
};
