let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin')

// 3个小插件
// 1、cleanWebpackPlugin // 清除dist文件夹后再打包
let { CleanWebpackPlugin } = require('clean-webpack-plugin')
// 2、copyWebpackPlugin
let CopyWebpackPlugin = require('copy-webpack-plugin')
// 3/bannerPlugin // 内置（版权声明）
let webpack = require('webpack')
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
    new CleanWebpackPlugin(), // 会自动寻找output目录
    new CopyWebpackPlugin({
      patterns: [
        // 拷贝多个目录写多个对象
        {
          from: 'doc', // 复制的文件夹
          to: '' // 粘贴的文件夹,默认是output
        }
      ]
    }),
    // 在打包的头部加版权声明
    new webpack.BannerPlugin('make 2019 by oooolyhy')
  ],
};