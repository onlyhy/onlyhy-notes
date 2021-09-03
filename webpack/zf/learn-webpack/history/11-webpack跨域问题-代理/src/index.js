
// 阿贾克斯四部曲
let xhr = new XMLHttpRequest()

// 默认会访问http://localhost:8080
// webpack-dev-server 8080 的服务 转发给 =》3000
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