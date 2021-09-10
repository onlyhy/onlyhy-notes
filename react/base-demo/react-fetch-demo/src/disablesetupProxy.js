// ********只有在src下且起名为setupProxy.js才会生效********
// const { createProxyMiddleware } = require("http-proxy-middleware");
// console.log(createProxyMiddleware);
// module.exports = function (app) {
//   app.use(
//     "/api",
//     createProxyMiddleware({
//       target: "http://localhost:3100",
//       changeOrigin: true,
//       // pathRewrite: {
//       //   "^/api": "/", // 如果路径中没有/api，需要把/api 变成空
//       // },
//     })
//   );
// };
