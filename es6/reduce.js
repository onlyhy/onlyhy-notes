// reduce 收敛函数  可以把一个数组转换成其它格式

// 执行过程  求和函数

// reduce方法使用的前提必须是数组不能为空，如果只有一个值则返回当前值

Array.prototype.reduce = function (callback, prev) {
  for (let i = 0; i < this.length; i++) {
    if (!prev) {
      prev = callback(this[i], this[i + 1], i + 1, this);
      i++;
    } else {
      prev = callback(prev, this[i], i, this);
    }
  }
  return prev;
};
let r = [1, 2, 3, 4, 5].reduce(function (
  previousValue,
  currentValue,
  index,
  array
) {
  // console.log(previousValue, currentValue); // 给了初始值5： 5 1  6 2  8 3  11 4  15 5  20
  return previousValue + currentValue;
},
5);

console.log(r);

// compose  用reduce实现compose 组合函数
function sum(a, b) {
  return a + b;
}
function len(str) {
  return str.length;
}
function addPrefix(str) {
  return "$" + str;
}

let res = addPrefix(len(sum("a", "b")));
console.log(res);

// reduceRight 反向 从右向左执行
// const compose = (...fns) => {
//   return function (...args) {
//     // lastFn: sum
//     let lastFn = fns.pop();
//     let r = lastFn(...args);
//     // fns:[addPrefix,len]
//     // 反向执行，把第一个结果r传给len
//     return fns.reduceRight((prev, current) => {
//       return current(prev);
//     }, r);
//   };
// };
// let final = compose(addPrefix, len, sum);
// const result = final("a", "b");
// console.log(result);

// reduce  正向
// 第一次执行  fna是addPrefix，fnb是len
// 第二次执行  fna是 function(...args){return addPrefix(len(...args))}  fnb是sum
// 最终
// function (...args) {
//   return (function (...args) {
//     return addPrefix(len(...args))
//   })(sum(...args));
// }


// const compose = (...fns)=>fns.reduce((fna,fnb)=>(...args)=>fna(fnb(...args)))

const compose = (...fns) => {
  return fns.reduce(function (fna, fnb) {
    // fna对应len方法，fnb对应sum方法
    return function (...args) {
      return fna(fnb(...args));
    };
  });
};

let final = compose(addPrefix, len, sum);
const result = final("a", "b");
console.log(result);

// reduce 可以做收敛函数 最终转化成一个结果
