// 深拷贝 和 浅拷贝
let o1 = { name: "hy" };
let o2 = { age: { n: 26 } };

let assign = { ...o1, ...o2 };
assign.age.n = 18;
console.log(assign); // 默认只展开对象的第一层  Object.assign 都是浅拷贝，但是如果只有一层那就是深拷贝

// 把对象上的每个属性都可拷贝一下  深拷贝（递归对象去拷贝，利用栈）
let obj = { name: { n: "1111" } };

// hash  记录拷贝前后的对应关系
function deepClone(obj, hash = new WeakMap()) {
  if (obj == null) return obj; // null undefined
  if (obj instanceof RegExp) return new RegExp(obj);
  if (obj instanceof Date) return new Date(obj);
  //...
  if (typeof obj !== "object") return obj;

  if (hash.has(obj)) return hash.get(obj); // 返回上次拷贝的结果  不再递归
  // 对象类型 obj  数组  对象
  const copy = new obj.constructor();
  hash.set(obj, copy);
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      copy[key] = deepClone(obj[key], hash);
    }
  }
  return copy;
}

deepClone(obj);

// 循环引用  拷贝过的对象，不需要再次拷贝
let obj1 = { a: "1" };
obj1.b = {};
obj1.b.a = obj1.b;
console.log(deepClone(obj1));
