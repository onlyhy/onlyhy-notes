let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin')
let webpack = require('webpack')
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    // filename: '[name].[hash].js', // 加哈希
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    // 优化（以index.js为入口逐层找引入依赖）
    noParse: /jquery/, // 不去解析jQuery中的依赖库，使得打包更快
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ]
          }
        }
      },
    ]
  },
  plugins: [
    // 3、优化- 从moment中忽略./local的引入，过滤掉多语言
    new webpack.IgnorePlugin(/\.\/locale/, /moment/),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
    })
  ],
};