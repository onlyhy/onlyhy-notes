// Vue2 中用的defineProperty，它的特点是给本来的属性可以用此方法来定义，并且可以把值转化成get和set
  
let obj={}

// 使用defineProperty需要定义第三方参数才能控制 set 和 get
let _value;
Object.defineProperty(obj,'a',{
    enumerable:true, // 对象可以被遍历
    configurable:true, // 属性可以被删除
    // writable:true, // 可以被修改   有get set 时就不要写writable了
    get(){
        return _value
    },
    set(newValue){
        _value = newValue
    }
    // value:'xxx'
})
// delete obj.a;
obj.a = 100;
console.log(obj.a);

// 把对象的属性全部转化成 getter + setter， 遍历所有对象，用Object.defineProperty重新定义属性，性能不好
// 如果是数组 采用这种方式 性能很差
// 如果对象里面嵌套对象  需要递归处理


// 没有对obj的属性进行重写，不需要递归，当访问到的属性是对象时再代理即可
let proxy = new Proxy(obj,{
    get(){}, // proxy.xxx
    set(){}, // proxy.xxx = 10
    has(){}, // 'xxx' in proxy
    deleteProperty(){}, // 删除属性
    ownKeys(){} // Object.getOwnPropertyNames方法和Object.getOwnPropertySymbols
}); // proxy是es6的api  不用改写原对象 但是兼容差

 