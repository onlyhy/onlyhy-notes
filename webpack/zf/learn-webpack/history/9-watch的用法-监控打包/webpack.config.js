let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: 'production',
  entry: {
    home: './src/index.js',
  },
  output: {
    filename: '[name].js',
    // filename: '[name].[hash].js', // 加哈希
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
    }),
  ],
  // 监控改动打包
  watch: true,
  watchOptions: { // 监控选项
    poll: 1000, // 多久检查一次变动，即一秒
    aggregateTimeout: 500, // 防抖，一直输入不打包
    ignored: /node_modules/ // 不需要监控的文件夹
  }
};