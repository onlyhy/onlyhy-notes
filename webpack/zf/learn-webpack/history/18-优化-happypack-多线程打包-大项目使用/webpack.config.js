let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin')
let webpack = require('webpack')
// happypack 模块， 可以实现多线程打包
let Happypack = require('happypack')
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
        // use: ['style-loader', 'css-loader']
        use: 'Happypack/loader?id=css'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        // use: [
        //   {
        //     loader: 'babel-loader',
        //     options: {
        //       presets: [
        //         '@babel/preset-env',
        //         '@babel/preset-react' // 解析react语法
        //       ]
        //     }
        //   }
        // ],
        // 项目大时可以使用happypack多线程打包
        use: 'Happypack/loader?id=js'
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
    // 5-优化-多线程打包js
    new Happypack({
      id: 'js',
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react' // 解析react语法
            ]
          }
        }
      ]
    }),
    // 多线程css打包
    new Happypack({
      id: 'css',
      use: ['style-loader', 'css-loader']
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
    })
  ],
};