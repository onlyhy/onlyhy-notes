let { SyncBailHook } = require('tapable')

class Lesson {
  constructor() {
    this.hooks = {
      arch: new SyncBailHook(['name'])
    }
  }
  tap() { // 注册监听函数
    this.hooks.arch.tap('node', function (name) {
      console.log('node', name)
      // return '想停止学习'
      return undefined // 返回undefined 继续往下走，否则会停止
    })
    this.hooks.arch.tap('react', function (name) {
      console.log('react', name)
    })
  }
  start() {
    this.hooks.arch.call('jw') // 调用把jw传到 this.hooks.arch.tap的第二个回调函数的name
  }
}

let l = new Lesson()
l.tap() // 注册两个事件
l.start() // 启动钩子