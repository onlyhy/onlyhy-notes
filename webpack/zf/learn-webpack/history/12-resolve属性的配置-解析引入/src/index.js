// 不加./证明是安装后的模块
// import 'bootstrap/dist/css/bootstrap.css'
import './style'
// 阿贾克斯四部曲
let xhr = new XMLHttpRequest()

// http://localhost:8080
// webpack-dev-server 8000 的服务 转发给 =》3000
// http-proxy 配置代理
// xhr.open('GET', '/api/user', true) // true是否异步
xhr.open('GET', '/user', true) // true是否异步

xhr.onload = () => {
  console.log(xhr.response)
}

xhr.send()

// console.log('home');
//
// class Log{
//   constructor() {
//     console.log('出错了')
//   }
// }
//
// let log = new Log()