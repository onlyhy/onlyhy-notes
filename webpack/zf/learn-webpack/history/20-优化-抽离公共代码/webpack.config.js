let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin')
let webpack = require('webpack')
module.exports = {
  // 优化项
  optimization: {
    // 之前版本为commonChunkPlugins
    splitChunks: { // 分割代码块
      // 缓存组
      cacheGroups: {
        // 公共模块
        common: {
          chunks: 'initial',
          minSize: 0,
          minChunks: 2,
        },
        // 第三方模块
        vendor: {
          priority: 1, // 权重，先抽离第三方模块
          test: /node_modules/,
          chunks: 'initial',
          minSize: 0,
          minChunks: 2,
        }
      }
    }
  },
  mode: 'production',
  entry: {
    index: './src/index.js',
    other: './src/other.js'
  },
  output: {
    filename: '[name].js',
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
              '@babel/preset-react' // 解析react语法
            ]
          }
        }
      },
    ]
  },
  devServer: {
    port: 3000,
    open: true,
    contentBase: './dist' // 指定运行目录
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
    })
  ],
};