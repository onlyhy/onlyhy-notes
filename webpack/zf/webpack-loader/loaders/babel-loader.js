const babel = require("@babel/core");
const loaderUtils = require("loader-utils");
function loader(source) {
  // 拿到webpack配置中babel-loader的选项  this是loader的上下文  loaderContext
  let options = loaderUtils.getOptions(this);
  let cb = this.async();
  babel.transform(
    source,
    {
      ...options,
      sourceMap: true,
      // resourcePath 当前处理文件的绝对路径
      filename: this.resourcePath.split("/").pop(),
    },
    (err, result) => {
      // 异步的
      // 错误、编译出来的代码、sourceMap
      cb(err, result.code, result.map);
    }
  );
}
module.exports = loader;
