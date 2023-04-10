module.exports = {
  extends: ["eslint:recommended", "next", "@osn"],
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  rules: {
    "@next/next/no-img-element": "off",
  },
};
