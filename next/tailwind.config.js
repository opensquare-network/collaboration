/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  presets: [require("@osn/common-ui/tailwind/preset.js")],
};
