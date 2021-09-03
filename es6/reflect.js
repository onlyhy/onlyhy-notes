// es6后续新增的方法放在Reflect上 （老的方法还是在Object上）

// Reflect有13种方法   常用的 ownKeys()  apply()   proxy(set has delete)

let s1 = Symbol('hy');

let obj ={
    name:'hy',
    age:26,
    [s1]:'ok'
}

// 可获取所有的key
Reflect.ownKeys(obj).forEach(item=>{
    console.log(item);
})

const fn = (a,b)=>{
    console.log('fn',a,b);
}

// 自定义了一个apply 则会默认调用它，但是如果想调用函数本身的apply就利用后面的方法
fn.apply = function(){
    console.log('apply');
}

// 调用函数本身的apply方法如何调用
// call的功能是让apply方法执行 并且 让apply方法中的this指向fn（相当于fn.apply(null,[1,2])）
// call的后面两个参数是传给apply的
Function.prototype.apply.call(fn,null,[1,2])

Reflect.apply(fn,null,[1,2])

