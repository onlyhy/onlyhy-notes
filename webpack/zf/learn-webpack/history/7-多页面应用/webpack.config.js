let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: 'development',
  entry: {
    home: './src/index.js',
    other: './src/other.js'
  },
  output: {
    // 多出口
    filename: '[name].js',
    // filename: '[name].[hash].js', // 加哈希
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'home.html',
      chunks: ['home'] // 引入的代码块
    }), 
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'other.html',
      chunks: ['other'] // 放的代码块
    })
  ]
};