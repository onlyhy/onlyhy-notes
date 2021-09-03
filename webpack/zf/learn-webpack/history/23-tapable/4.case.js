class AsyncParalleHook { // 循环执行  异步并行的钩子
  constructor(args) { // agrs: ['name']
    this.tasks = []
  }
  tapAsync(name, task) {
    this.tasks.push(task)
  }
  callAsync(...args) {
    let finalCallback = args.pop() // 拿出最终的函数
    let index = 0
    let done = () => {
      index++
      if(index === this.tasks.length) {
        finalCallback()
      }
    }
    this.tasks.forEach(task => {
      task(...args, done)
    })
  }
}

let hook = new AsyncParalleHook(['name'])
let total = 0
hook.tapAsync('react', function (name, cb) {
  setTimeout(() => {
    console.log('react', name)
    cb()
  }, 1000)
})

hook.tapAsync('node', function (name, cb) {
  setTimeout(() => {
    console.log('node', name)
    cb()
  }, 1000)
})
hook.tapAsync('webpack', function (name, cb) {
  setTimeout(() => {
    console.log('webpack', name)
    cb()
  }, 1000)
})

hook.callAsync('jw', function () {
  console.log('end')
}) // 可以传多个
