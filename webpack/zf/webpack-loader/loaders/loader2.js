function loader(source) {
  // loader的参数就是源代码
  console.log("loader2=======");
  return source;
}
loader.pitch = function () {
  console.log("loader2-pitch");
  // pitch有返回值：(跳过所有后续包含自身loader)执行前一个normal
  // return "22222";
};
module.exports = loader;
