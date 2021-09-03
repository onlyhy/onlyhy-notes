let path = require("path");
module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolveLoader: {
    modules: ["node_modules", path.resolve(__dirname, "loaders")],
    // 别名
    // alias: {
    //   loader1: path.resolve(__dirname, "loaders", "loader1.js"),
    // },
  },
  devtool: "source-map",
  watch: true,
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.jpe?g$/,
        // 目的就是根据图片生成一个md5戳 发射到dist目录下
        // file-loader还会返回当前的图片路径
        // use: "file-loader",
        use: [
          {
            // url-loader: limit可以控制：图片大于这个值生成图片否则生成base64，如果是生成图片会调用file-loader发射出来，
            loader: "url-loader",
            options: {
              limit: 200 * 1024,
            },
          },
        ],
      },
      {
        test: /\.js$/,
        use: [
          //banner 用来在文件内容前添加一个注释,用text,或者读取filename里面的内容
          {
            loader: "banner-loader",
            options: {
              text: "开心快乐每一天",
              filename: path.resolve(__dirname, "banner.js"),
            },
          },
        ],
      },
      // {
      //   test: /\.js$/,
      //   use: [
      //     {
      //       loader: "babel-loader",
      //       options: {
      //         presets: ["@babel/preset-env"],
      //       },
      //     },
      //   ],
      // },
    ],
    // loader分类：pre在前面执行  post在后面执行  normal正常执行
    // loader顺序：pre + normal + inline + post
    // loader的顺序：从右向左，从下到上
    // rules: [
    //   // { test: /\.js$/, use: "loader1", enforce: "pre" },
    //   // { test: /\.js$/, use: "loader2" },
    //   // { test: /\.js$/, use: "loader3", enforce: "post" },
    //   {
    //     test: /\.js$/,
    //     use: ["loader3", "loader2", "loader1"],
    //   },
    // ],
  },
};
