// 数据类型  （去重） Set  Map  weakMap  weakSet

let set = new Set([1, 2, 1, 1, 2, 2, 2, 1, 1, 3]);
console.log(set);
set.add({ a: 1 });
set.add({ a: 1 });

console.log(set);

console.log(set.entries(set)); // 返回键值对

console.log(set.has("b"));

// Map 键值对的集合  也可以接受一个数组作为参数，数组的成员是一个个表示键值对的数组
let map = new Map([
  ["c", 1],
  ["b", 2],
  ["b", 3],
]);
console.log(map);
map.set("test", 4);
console.log(map);

let map2 = new Map();
map2.set("111111", 2);
console.log(map2);

// map的key可以使用对象类型
map2.set({ test: 1 }, 3);
console.log(map2);

console.log(Object.prototype.toString.call(new Map())); // [object Map]
console.log(Object.prototype.toString.call(new Set())); // [object Set]

// 数组  交集  并集  差集
let arr1 = [1, 2, 3, 4];
let arr2 = [3, 4, 5, 6];

function union(arr1, arr2) {
  let s = new Set([...arr1, ...arr2]); // 集合  集合可以被迭代
  return [...s];
}

console.log(union(arr1, arr2));

function intersection(arr1, arr2) {
  let s1 = new Set(arr1);
  let s2 = new Set(arr2);
  // Set只有forEach，先转成数组，再调用方法
  return [...s1].filter(item => {
    return s2.has(item);
  });
}
console.log(intersection(arr1, arr2));

function difference(arr1, arr2) {
  let s1 = new Set(arr1);
  let s2 = new Set(arr2);
  // Set只有forEach，先转成数组，再调用方法
  return [...s1].filter(item => {
    return !s2.has(item);
  });
}
console.log(difference(arr1, arr2));

// weakMap 弱引用  垃圾回收 "标记引用"  key只能是对象

class MyTest {}
let my = new MyTest(); // 对象
console.log();
// let map = new Map();
let map = new WeakMap();

map.set(my, 1);
my = null; //  当给一个变量设置为null的时候，不会马上回收  会在合适的机会自己清空
// map 引用的对象不会被回收  但是  weakMap引用的对象被置为null时，后续会被清空
