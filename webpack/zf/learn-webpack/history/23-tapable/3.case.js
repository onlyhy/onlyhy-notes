class SyncWaterfallHook { // 钩子是同步的  瀑布模式，上一个可以传值给下一个
  constructor(args) { // agrs: ['name']
    this.tasks = []
  }
  tap(name, task) {
    this.tasks.push(task)
  }
  call(...args) {
    let [first, ...others] = this.tasks // 参数解构
    let ret = first(...args)
    // arr.reduce(callback,[initialValue])
    // callback （执行数组中每个值的函数，包含四个参数）
      // 1、previousValue （上一次调用回调返回的值，或者是提供的初始值（initialValue））
      // 2、currentValue （数组中当前被处理的元素）
      // 3、index （当前元素在数组中的索引）
      // 4、array （调用 reduce 的数组）
    // initialValue （作为第一次调用 callback 的第一个参数。）
   let sum = others.reduce((a, b) => {
      return b(a)
    }, ret) // 初始值为ret
    console.log(sum)
  }
}

let hook = new SyncWaterfallHook(['name'])
hook.tap('react', function (name) {
  console.log('react', name)
  return 'react ok'
})

hook.tap('node', function (data) {
  console.log('node', data)
  return 'node ok'
})
hook.tap('webpack', function (data) {
  console.log('node', data)
  return 'webpack ok'
})

hook.call('jw') // 可以传多个
