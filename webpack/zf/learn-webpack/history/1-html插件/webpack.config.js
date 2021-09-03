// webpack 是 node写出来的 按照node的写法
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'development', // 模式 默认两种 production  development
    entry: './src/index.js', // 入口
    output: {
        // filename: 'bundle.js', // 打包后的文件名
        filename: 'bundle.[hash:8].js', // 打包后的文件名 加8位哈希
        // path: path.resolve('dist'), // 路径必须是一个绝对路径
        path: path.resolve(__dirname, 'build'), // 路径必须是一个绝对路径, __dirname：当前目录生成一个build文件夹
    },
    devServer: { // 开发服务器配置
        port: 3000, // 端口号
        progress: true, // 进度条
        contentBase: './build', // 运行的目录
        compress: true // 压缩 
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', // 引入的模板
            filename: 'index.html',
            minify: { // 压缩
                removeAttributeQuotes: true, // 移除双引号
                collapseWhitespace: true, // 折叠空行

            },
            hash: true // 哈希戳
        })
    ]
};