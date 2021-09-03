let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin')
let webpack = require('webpack')
module.exports = {
  mode: 'production',
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
    // 3、优化- 从moment中忽略./local的引入，过滤掉多语言
    new webpack.IgnorePlugin(/\.\/local/, /moment/),
    // 4、优化-动态连接库
    new webpack.DllReferencePlugin({
      // 引用的文件
      manifest: path.resolve(__dirname, 'dist', 'manifest.json')
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
    })
  ],
};