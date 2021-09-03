class AsyncParalleHook { // 循环执行
  constructor(args) { // agrs: ['name']
    this.tasks = []
  }
  tapPromise(name, task) {
    this.tasks.push(task)
  }
  promise(...args) {
    let tasks = this.tasks.map(task => task(...args))
    return Promise.all(tasks)
  }
}

let hook = new AsyncParalleHook(['name'])
let total = 0
hook.tapPromise('react', function (name, cb) {
  return new Promise(((resolve, reject) => {
    setTimeout(() => {
      console.log('react', name)
      resolve()
    }, 1000)
  }))
})

hook.tapPromise('node', function (name, cb) {
  return new Promise(((resolve, reject) => {
    setTimeout(() => {
      console.log('node', name)
      resolve()
    }, 1000)
  }))
})
hook.tapPromise('webpack', function (name, cb) {
  return new Promise(((resolve, reject) => {
    setTimeout(() => {
      console.log('webpack', name)
      resolve()
    }, 2000)
  }))
})

hook.promise('jw').then(function () {
  console.log('end')
})

// AsyncParalleBailHook() 带保险的异步并发的钩子
