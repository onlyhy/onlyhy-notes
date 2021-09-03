class DonePlugin {
  apply(compiler) {
    // compiler上有很多hooks
    compiler.hooks.done.tap("DonePlugin", (stats) => {
      console.log("编译完成~~~~");
    });
  }
}

module.exports = DonePlugin;
