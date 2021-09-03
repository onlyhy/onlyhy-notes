const HtmlWebpackPlugin = require("html-webpack-plugin");
// 把外链标签变成内联标签
class InlineSourcePlugin {
  constructor({ match }) {
    this.reg = match; // 正则  使用plugin时指定需要修改哪些类型的文件
  }
  // 处理引入标签的数据
  processTags(data, compilation) {
    let headTags = [],
      bodyTags = [];
    data.headTags.map((headTag) => {
      headTags.push(this.processTag(headTag, compilation));
    });
    data.bodyTags.map((bodyTag) => {
      bodyTags.push(this.processTag(bodyTag, compilation));
    });
    return { ...data, headTags, bodyTags };
  }
  // 处理单个标签的数据
  processTag(tag, compilation) {
    let newTag, url;
    if (tag.tagName === "link" && this.reg.test(tag.attributes.href)) {
      newTag = {
        tagName: "style",
        attributes: { type: "text/css" },
      };
      url = tag.attributes.href;
    }
    if (tag.tagName === "script" && this.reg.test(tag.attributes.src)) {
      newTag = {
        tagName: "script",
        attributes: { type: "application/javascript" },
      };
      url = tag.attributes.src;
    }
    if (url) {
      // 文件的内容放到innerHTML属性上
      newTag.innerHTML = compilation.assets[url].source();
      delete compilation.assets[url]; // 删除掉原有应该生成的资源!!!!
      return newTag;
    }
    return tag;
  }
  apply(compiler) {
    // 因为要插到html里面，所以要通过HtmlWebpackPlugin来实现这个功能
    compiler.hooks.compilation.tap("InlineSourcePlugin", (compilation) => {
      // 修改资源标签组
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync(
        "alterPlugin",
        (data, cb) => {
          console.log(11111, data);
          data = this.processTags(data, compilation); // 需要用到compilation assets 资源
          cb(null, data);
        }
      );
    });
  }
}

module.exports = InlineSourcePlugin;
