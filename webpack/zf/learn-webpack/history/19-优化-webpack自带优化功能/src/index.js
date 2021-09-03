import calc from './test.js'
// imoprt 在生产环境下 会自动去除掉没有引用的代码
// tree-shaking 树的摇晃，把没有用的代码自动删除掉
// es6模块会把结果放到default，如果用require引入的话，应该执行calc.default.sum
console.log(calc.sum(1, 2))

// scope hosting 作用域提升
let a = 1
let b = 2
let c = 3
let d = a + b + c // 在webpack中打包会自动省略abc的声明， 可以简化代码
console.log(d, '.....')