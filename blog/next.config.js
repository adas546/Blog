/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, //关闭严格模式
};

module.exports = nextConfig;

// const withCss = require("@zeit/next-css");
// if (typeof require !== "undefined") {
//   require.extensions[".css"] = (file) => {};
// }

// module.exports = withCss({});
