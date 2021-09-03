class SyncBaillHook { // 钩子是同步的  Baill是保险的意思，有任何一个函数返回了非undefined，就会停止执行
  constructor(args) { // agrs: ['name']
    this.tasks = []
  }
  tap(name, task) {
    this.tasks.push(task)
  }
  call(...args) {
    let ret; // 当前这个函数的返回值
    let index = 0 // 当前要执行函数的的下标
    // 有任何一个函数返回了非undefined，就会停止执行，至少要先执行一个
    do {
     ret = this.tasks[index++](...args)
    } while(ret === undefined && index < this.tasks.length)
  }
}

let hook = new SyncBaillHook(['name'])
hook.tap('react', function (name) {
  console.log('react', name)
  // return '停止向下执行'  // 返回不是undefined，卡住，不会继续执行
  return undefined // 返回undefined 继续往下走，否则停止
})

hook.tap('node', function (name) {
  console.log('node', name)
})

hook.call('jw') // 可以传多个