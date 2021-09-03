const loaderUtils = require("loader-utils");
const mime = require("mime");
function loader(source) {
  let { limit } = loaderUtils.getOptions(this);
  /* 
        this.resourcePath:  资源路径
        mime.getType()  文件类型
    */
  if (limit && limit > source.length) {
    // limit大于图片，生成base64
    // 图片base64的规则
    return `module.exports="data:${mime.getType(
      this.resourcePath
    )};base64,${source.toString("base64")}"`;
  } else {
    // 图片，调用file-loader来处理
    return require("./file-loader").call(this, source);
  }
}
loader.raw = true;
module.exports = loader;
