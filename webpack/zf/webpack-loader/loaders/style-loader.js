const loaderUtils = require("loader-utils");
function loader(source) {
  /* 
        在style-loader中导出一个脚本
        JSON.stringify  把源码转成字符串
    */
  let str = `
        let style = document.createElement('style');
        style.innerHTML = ${JSON.stringify(source)};
        document.head.appendChild(style);
   `;
  return str;
}
// style-loader 加了pitch
// style-loader   剩余的请求：css-loader!less-loader/./a.less
loader.pitch = function (remainingRequest) {
  // 让style-loader去处理  剩余的请求：css-loader!less-loader!a.less
  // 此时remainingRequest是绝对路径，loaderUtils.stringifyRequest 可以将绝对路径转换为相对路径
  // require路径 返回的就是css-loader处理好的结果(module.exports = 字符串)  require('!!css-loader!less-loader!a.less')
  // !! 是什么都不要只要inline执行
  let str = `
        let style = document.createElement('style');
        style.innerHTML = require(${loaderUtils.stringifyRequest(
          this,
          "!!" + remainingRequest
        )});
        document.head.appendChild(style);
   `;
  return str;
};

module.exports = loader;

// JSON.stringify 会把回车啥的转换成\n
// style.innerHtml = "body{\r\n background:red}"
