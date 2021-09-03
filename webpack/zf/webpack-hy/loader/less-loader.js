const less = require("less");
function loader(source) {
  let css = "";
  less.render(source, (err, c) => {
    css = c.css;
  });
  // 直接\n 不能识别成换行 需要替换成\\n
  css = css.replace(/\n/g, "\\n");
  return css;
}
module.exports = loader;
