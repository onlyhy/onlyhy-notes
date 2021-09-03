class FileListPlugin {
  // 假设filename参数一定存在
  constructor({ filename }) {
    this.filename = filename;
  }
  apply(compiler) {
    // 文件已经准备好了，要进行发射
    compiler.hooks.emit.tap("FileListPlugin", (compliation) => {
      let assets = compliation.assets; // 所有的资源
      let content = `## 文件名    资源大小\r\n`;
      // Object.entries 可以把对象变成数组
      // [[bundles.js,{}],[index.html,{}]]
      Object.entries(assets).map(([filename, statObj]) => {
        content += `- ${filename}   ${statObj.size()}\r\n`;
      });
      console.log(content);

      // 资源对象
      assets[this.filename] = {
        source() {
          return content;
        },
        size() {
          return content.length;
        },
      };
    });
  }
}
module.exports = FileListPlugin;
