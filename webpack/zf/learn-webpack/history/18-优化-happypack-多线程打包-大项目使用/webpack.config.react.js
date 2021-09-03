let path = require('path')
let webpack = require('webpack')
module.exports = {
  mode: 'development',
  entry: {
    // test: './src/test.js',
    // 创建动态链接库， 提前抽离react，和react-dom到dist目录，动态引用
    react: ['react', 'react-dom']
  },
  output: {
    filename: '_dll_[name].js', // 产生的文件名
    path: path.resolve(__dirname, 'dist'),
    // 给打包的结果返回值用ab变量接收
    // library: 'ab', // 产生的变量名字 test.js
    library: '_dll_[name]', // 产生的变量名字 react
    // libraryTarget: 'var' // 值： var, umd, commonjs, this 默认为var
  },
  plugins: [
    // 动态链接库插件
    new webpack.DllPlugin({ // name == library
      name: '_dll_[name]',
      // manifest.json为任务清单文件
      path: path.resolve(__dirname, 'dist', 'manifest.json')
    })

  ]
}