let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin')
let webpack = require('webpack')
module.exports = {
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
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
    ]
  },
  plugins: [
    // 定义环境变量
    new webpack.DefinePlugin({
      // DEV: "'dev'"
      DEV: JSON.stringify('dev'),
      FLAG: 'true',
      EXPORESSION: '1+1'
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
    })
  ],
  // 解析第三方包，common 引入别名
  resolve: {
    modules: [
      path.resolve('node_modules'),
      // path.resolve(path.resolve('dist')
    ],
    // import xx from NavBar.vue , 引用省略扩展名
    // 先找js，再找css，再找vue，再找json, 依次解析
    extensions: ['.js', '.css', '.vue', '.json']
    // alias: { // 别名
    //   bootstrap: 'bootstrap/dist/css/bootstrap.css'
    // }
    // 先找styel 再找main
    // mainFields: ['style', 'main'],
    // mainfiles: [], // 入口文件的名字 index.js
  },
  devServer: {
    // 1、代理
    // proxy: {
    //   // '/api': 'http://localhost:3000' // 代理到3000
    //   '/api': {
    //     target: 'http://localhost:3000', // 代理到3000
    //     pathRewrite: { 'api': '' } // 重写 去除api http://localhost:3000/user
    //   }
    // }

    // 2、单纯的模拟数据
    // before(app) {
    //   app.get('/user', (req, res) => {
    //     res.json({ name: '珠峰架构before ' })
    //   })
    // }

    // 3、有服务单，不用代理来处理，能不能在服务单中启动webpack端口用服务端口
  }
};