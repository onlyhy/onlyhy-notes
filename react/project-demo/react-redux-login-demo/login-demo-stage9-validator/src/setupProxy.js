const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:3033",
      changeOrigin: true,
      // pathRewrite: {
      //   "^/api": "/", // 如果路径中没有/api，需要把/api 变成空
      // },
    })
  );
};
