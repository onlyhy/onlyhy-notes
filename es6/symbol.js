// Symbol 基本数据类型 string number boolean undefined null symbol bigint
// Symbol()可创建独一无二的类型

let s1 = Symbol("hy");
let s2 = Symbol("hy");
// console.log(s1 === s2); // false

// 用作对象的key
let obj = {
  name: "hy",
  age: 26,
  [s1]: "ok",
};
console.log(obj);

// Symbol 属性默认是不能枚举的
for (let key in obj) {
  console.log(obj[key]);
}

// 获取所有symbol
console.log(Object.getOwnPropertySymbols(obj));
// 获取普通类型的key
console.log(Object.keys(obj));

let s3 = Symbol.for("hy"); // 第一次声明是全新的
let s4 = Symbol.for("hy"); // 把之前声明的拿过来用

console.log(s3 === s4); // true

// ***************元编程的能力即Symbol有一些属性可以改变语法本身***************

// typeof 判断基本类型
// 判断复杂类型时用  Object.prototype.toString.call()
// 或instanceof constructor

let obj1 = {
  [Symbol.toStringTag]: "hy",
};
console.log(Object.prototype.toString.call(obj1));

// 隐式类型转化
let obj2 = {};
console.log(obj2 + 1); //[object Object]1

let obj3 = {
  [Symbol.toPrimitive](type) {
    console.log(type); // default
    return "123";
  },
};
console.log(obj3 + "1"); //1231  默认转的时候会去调用Symbol.toPrimitive

let instance = {
  [Symbol.hasInstance](value) {
    return "name" in value;
  },
};
console.log({ name: "hy" } instanceof instance); // _proto_  常考面试题：实现一个instanceof
