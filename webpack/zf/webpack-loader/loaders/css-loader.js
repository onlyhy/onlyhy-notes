const loaderUtils = require("loader-utils");
function loader(source) {
  // 通过require文件就会被打包
  // 匹配url
  let reg = /url\((.+?)\)/g;
  // 查找的位置
  let pos = 0;
  let current;
  let arr = ["let list=[]"];
  while ((current = reg.exec(source))) {
    // 匹配到的路径
    let [matchUrl, g] = current;
    console.log(matchUrl, g);
    console.log(reg.lastIndex, matchUrl.length);
    // 获取匹配到url之前的所有代码的位置
    let last = reg.lastIndex - matchUrl.length;
    // 截取匹配到url之前的所有代码  JSON.stringify可以解决代码中换行回车的问题，转换成\r\n等
    arr.push(`list.push(${JSON.stringify(source.slice(pos, last))})`);
    // pos变成匹配到的代码块的后面位置
    pos = reg.lastIndex;
    // 把g替换成require得写法 =>    url(require('xxx'))
    arr.push(`list.push('url('+require(${g})+')')`);
  }
  arr.push(`list.push(${JSON.stringify(source.slice(pos))})`);
  arr.push(`module.exports = list.join('')`);
  console.log(1111, arr, arr.join("\r\n"));
  return arr.join("\r\n");
}
module.exports = loader;
