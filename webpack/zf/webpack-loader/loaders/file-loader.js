const loaderUtils = require("loader-utils");

function loader(source) {
  /* 
        interpolateName: 根据给的格式生成一个路径(图片)
        "[hash](hash文件名).[ext](文件后缀 扩展名)"
        content(source文件流，根据这个内容产生)
    */
  let filename = loaderUtils.interpolateName(this, "[hash].[ext]", {
    content: source,
  });
  // 发射文件
  this.emitFile(filename, source);
  // file-loader需要返回一个路径
  return `module.exports='${filename}'`;
}
loader.raw = true; // 源码->二级制模式buffer
module.exports = loader;
