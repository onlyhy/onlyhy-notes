/*
* webpack打包图片
* */

// 1）在js中创建图片来引入
import logo from './logo.png'; // 把图片引入，返回的结果是一个新的图片地址
let image = new Image();
image.src = logo;
document.body.appendChild(image);
// 2)background引入图片， css-loader处理
// 3)<img src="" alt=""/> html中图片的资源由html-withimg-loader解析

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
require('./index.less');
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