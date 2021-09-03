let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin')
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
    })
  ],
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

    // 3、有服务端，不用代理来处理，能不能在服务端中启动webpack，端口用服务端口，相当于前后端起在一个端口上
  }
};