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
  // 1、源码映射，会单独生成一个sourcemap文件，出错了会标识当前报错的行和列, 特点大而全且独立
  // devtool: 'source-map', // 增加源码 映射， 可以帮助调试代码

  // 2、不会产生单独的文件，但是可以显示行和列, 集成到js中
  // devtool: 'eval-source-map'

  // 3、不会显示列，但是是一个单独的映射文件
  // devtool: 'cheap-module-source-map' // 产生后可以保存起来

  // 4、不会产生文件，集成在打包后的文件中 不会产生列
  devtool: 'cheap-module-eval-source-map'

};