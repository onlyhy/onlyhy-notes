// let button = document.createElement('button')
// // vue和react的懒加载都是类似于该功能
// button.addEventListener('click', function () {
//   // console.log('click')
//   // es6 草案中的语法 jsonp实现动态加载文件
//   import('./source.js')
//     .then(data => {
//       console.log(data.default)
//     })
// })
// button.innerHTML = 'hello'
// document.body.appendChild(button)

import str from './source.js'

console.log(str)

if(module.hot) { // 如果模块支持热更新
  // 更新后回调
  module.hot.accept('./source', () => {
    console.log('热更新了')
    console.log(require('./source.js'))
  })
}