// webpack 是 node写出来的 按照node的写法
let path = require('path');
// html打包插件
let HtmlWebpackPlugin = require('html-webpack-plugin');
// 样式抽离插件, 如果要生成两个可以再引一个接着再new一个
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
// css压缩 在优化项配置 与uglifyJsPlugin配合使用
let OptimizeCss = require('optimize-css-assets-webpack-plugin');
let UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// 全局引入jQuery
let webpack = require('webpack');

module.exports = {
    mode: 'development', // 模式 默认两种 production  development
    entry: './src/index.js', // 入口
    output: {
        filename: 'bundle.js', // 打包后的文件名
        // filename: 'bundle.[hash:8].js', // 打包后的文件名 加8位哈希
        // path: path.resolve('dist'), // 路径必须是一个绝对路径
        path: path.resolve(__dirname, 'build'), // 路径必须是一个绝对路径, __dirname：当前目录生成一个build文件夹
        // 给引用资源加入一个公共的路径
        // publicPath: 'learn'
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

            hash: true // 哈希戳
        }),
        new MiniCssExtractPlugin({
            filename: '/css/main.css',

        }),
        // 给每个模块注入$
        new webpack.ProvidePlugin({
            $: 'jquery'
        })
    ],
    module: { // 模块
        rules: [
            {
              test: /\.html$/,
              use: 'html-withimg-loader'  // 解析 html中的图片资源
            },
            // url-loader
            {
                test: /\.(png|jpg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        // 做一个限制， 小于*k用base64转化，否则用file-loader产生真实的图片
                        limit: 10,
                        outputPath: '/img/', // 产出到img目录下
                        esModule: false, // 兼容html-withimg-loader与html-webpack-plugin产生冲突和新版的file-loader
                        // publicPath: 'https://qq.com' // cdn图片公共路径
                    }
                }
            },
            // file-loader
            // {
            //     test: /\.(png|jpg|gif)$/,
            //     use: {
            //         loader: 'file-loader',
            //         options: {
            //             esModule: false
            //         }
            //     }
            // },

            // eslint代码校验
            // {
            //     test: /\.js$/,
            //     use: {
            //         loader: 'eslint-loader',
            //         options: {
            //             enforce: 'pre' // 强制在previous执行 另外参数post为在之后执行
            //         }
            //     },
            // },
            // babel转换
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: { // 用babel-loader 需要把es6转es5
                        presets: [ // 预设
                            '@babel/preset-env'
                        ],
                        plugins: [ // 插件 转换高级语法
                            ["@babel/plugin-proposal-decorators", { "legacy": true }],
                            ["@babel/plugin-proposal-class-properties", { "loose" : true }],
                            "@babel/plugin-transform-runtime" // 代码运行时 如  function * gen(params) {yield 1}
                        ]
                    }
                },
                include: path.resolve(__dirname, 'src'), // 包括的文件夹
                exclude: /node_modules/ // 排除的文件夹
            },
            // css loader 处理@import这种语法
            // style loader 把css loader 插入到head 的标签中
            // loader 的特点希望单一
            // 字符串只用一个loader, 多个loader需要用[]
            // loader的顺序默认是从右向左执行, 从下到上执行
            // loader 还可以写成对象形式
            {
                test:  /\.css$/,
                use: [
                    // 插入style标签
                    // {
                        // loader: 'style-loader',
                        // options: {
                        //     insert: 'head' // 在head标签插入样式
                        // }
                    // },
                    // 抽离生成css文件插入到lin标签中
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader' // css通过postcss.config.js配置加webkit前缀
                ]
            },
            {
                // 处理less文件 sass stylus node-sass sass-loader
                test: /\.less$/,
                use: [
                    // {
                    //     loader: 'style-loader',
                    //     options: {
                    //         insert: 'head' // 在head标签插入样式
                    //     }
                    // },
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'less-loader' // 把less转换成css
                ]
            },
        ]
    },
    optimization: { // 优化项
        minimizer: [
            new OptimizeCss(), // css优化
            // js优化
            new UglifyJsPlugin({
                cache: true,
                parallel: true, // 并发打包
                sourceMap: true // 引用地图，调试用
            })
        ]
    }
};