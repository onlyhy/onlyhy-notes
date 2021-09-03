// express 为node自带一个框架
// 1、代理服务器
// let express = require('express')
//
// let app = express()
//
// app.get('/user', (req, res) => {
//   res.json({ name: '珠峰架构' })
// })

// app.listen(3000)

// 3、服务器和webpack在同一端口启动
let express = require('express')
let app = express()
let webpack = require('webpack')

// 中间件
let middle = require('webpack-dev-middleware')
let config = require('./webpack.base.js')
// 处理后的结果
let compiler = webpack(config)
app.use(middle(compiler))

app.get('/user', (req, res) => {
  res.json({ name: '珠峰架构' })
})

app.listen(3000)