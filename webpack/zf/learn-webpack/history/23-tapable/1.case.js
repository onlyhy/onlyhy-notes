class SyncHook { // 钩子是同步的
  constructor(args) { // agrs: ['name']
    this.tasks = []
  }
  tap(name, task) {
    this.tasks.push(task)
  }
  call(...args) {
    this.tasks.forEach(task => { task(...args) })
  }
}

let hook = new SyncHook(['name'])
hook.tap('react', function (name) {
  console.log('react', name)
  return '想停止学习'
})

hook.tap('node', function (name) {
  console.log('node', name)
})

hook.call('jw') // 可以传多个