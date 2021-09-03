let { AsyncSeriesHook } = require('tapable')

class Lesson {
  constructor() {
    this.index = 0
    this.hooks = {
      arch: new AsyncSeriesHook(['name'])
    }
  }
  tap() { // 注册监听函数
    this.hooks.arch.tapAsync('node',  (name, cb) => {
      setTimeout(() => {
        console.log('node', name)
        cb()
      }, 1000)
    })
    this.hooks.arch.tapAsync('react', (data, cb) => {
      setTimeout(() => {
        console.log('react', data)
        cb()
      }, 1000)
    })
  }
  start() {
    this.hooks.arch.callAsync('jw', function () {
      console.log('end')
    }) // 调用把jw传到 this.hooks.arch.tap的第二个回调函数的name
  }
}

let l = new Lesson()
l.tap() // 注册两个事件
l.start() // 启动钩子