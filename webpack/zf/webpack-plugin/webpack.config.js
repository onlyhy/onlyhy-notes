let path = require("path");
let DonePlugin = require("./plugins/DonePlugin");
let AsyncPlugin = require("./plugins/AsyncPlugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FileListPlugin = require("./plugins/FileListPlugin");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const InlineSourcePlugin = require("./plugins/InlineSourcePlugin");
const UploadPlugin = require("./plugins/UploadPlugin");
module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "build.js",
    path: path.resolve(__dirname, "dist"),
    // publicPath: "", // 资源前面加
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [miniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    new DonePlugin(),
    new AsyncPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    // 在发射之前，添加一个文件
    new FileListPlugin({
      filename: "list.md",
    }),
    new miniCssExtractPlugin({
      filename: "main.css",
    }),
    // new InlineSourcePlugin({
    //   match: /\.(css|js)/,
    // }),
    new UploadPlugin({
      // 七牛云
      bucket: "", // 上传到哪个资源上
      domain: "", // 上传到哪个域名
      accessKey: "", // 个人中心-秘钥管理 AK
      secretKey: "", // 个人中心-秘钥管理 SK
    }),
  ],
};
