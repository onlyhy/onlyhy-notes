let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin')
let webpack = require('webpack')
module.exports = {
  mode: 'production',
  entry: {
    index: './src/index.js',
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
            // 预设
            presets: [
              '@babel/preset-env',
              '@babel/preset-react' // 解析react语法
            ],
            // 插件
            plugins: [
              '@babel/plugin-syntax-dynamic-import'
            ]
          }
        }
      },
    ]
  },
  devServer: {
    hot: true, // 启用热更新，刷新组件局部，不刷新页面
    port: 3000,
    open: true,
    contentBase: './dist' // 指定运行目录
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
    }),
    // 热更新插件
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin() // 打印更新的模块路径，可以知道那个模块更新了
  ],
};