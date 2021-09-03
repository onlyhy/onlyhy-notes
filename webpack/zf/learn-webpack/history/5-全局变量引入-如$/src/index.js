

/*1、往widow注入$对象*/
// import $ from 'jquery'
// import $ from 'expose-loader?$!jquery' //也可以写到webpack.config.js中

// expose-loader 暴露全局的loader 内联的loader
// pre前面执行的loader normal普通的loader 内联loader 后置loader
// console.log(window.$);

/*每个模块-全局注入$*/
console.log($);

// let str = require('./a.js');
// console.log(str);
// 
// require('./index.css');
// require('./index.less');
//
// let fn = () => {
//     console.log('log');
// };
// fn();
// @log // 装饰器
// class A {
//     a = 1
// }
// let a = new A();
// console.log(a.a);
//
// function log(target) {
//     console.log(target, '23');
// }