let { AsyncParallelHook } = require('tapable')
// 异步的钩子 （串行和并行） 并行需要等待所有并发的异步事件执行后再执行回调方法
// 提示发送多个请求
// 注册方法分为 tap / tapAsync
// tapable库中有三种注册方法：tap同步注册， tapAsync(cb) tapPromise(注册是promise)
// 调用call callAsync promise
class Lesson {
  constructor() {
    this.index = 0
    this.hooks = {
      arch: new AsyncParallelHook(['name'])
    }
  }
  tap() { // 注册监听函数
    this.hooks.arch.tapPromise('node',  (name) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('node', name)
          resolve()
        }, 1000)
      })
    })
    this.hooks.arch.tapPromise('react', (name) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('react', name)
          resolve()
        }, 2000)
      })
    })
  }
  start() {
    this.hooks.arch.promise('jw')
    .then(function () {
      console.log('end')
    }) // 调用把jw传到 this.hooks.arch.tap的第二个回调函数的name
  }
}

let l = new Lesson()
l.tap() // 注册两个事件
l.start() // 启动钩子