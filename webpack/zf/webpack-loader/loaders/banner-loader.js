const loaderUtils = require("loader-utils");
const { validate } = require("schema-utils"); //  校验loader参数类型
const fs = require("fs"); // 读取文件
function loader(source) {
  /* 
       false不要缓存，如果loader计算量大建议使用缓存
       webpack也推荐使用缓存
    */
  this.cacheable && this.cacheable(false);
  let options = loaderUtils.getOptions(this);
  let cb = this.async();
  let schema = {
    type: "object",
    properties: {
      text: {
        type: "string",
      },
      filename: {
        type: "string",
      },
    },
  };
  // 校验  最后一个参数是万一参数传的不对，告诉是哪个loader出错了
  validate(schema, options, "banner-loader");
  if (options.filename) {
    this.addDependency(options.filename); // 自动添加文件依赖，依赖变化就会重新打包
    fs.readFile(options.filename, "utf-8", (err, data) => {
      cb(err, `/**${data}**/${source}`);
    });
  } else {
    cb(null, `/**${options.text}**/${source}`);
  }
}
module.exports = loader;
