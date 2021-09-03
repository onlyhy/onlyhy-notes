module.exports = {
    plugins: [
        require('autoprefixer')
    ]// 自动加webkit前缀
    // 另外pakage.json要加入如下配置
    // "browserslist": [
    //     "defaults",
    //     "not ie <= 8",
    //     "last 2 versions",
    //     "> 1%",
    //     "iOS >= 7",
    //     "Android >= 4.0"
    // ]
}