#! /usr/bin/env node

// 1、需要找到当前执行命令的路径 拿到webpack.config.js
let path = require("path");
// 配置文件
let config = require(path.resolve("webpack.config.js"));

let Compiler = require("../lib/Compiler.js");
let compiler = new Compiler(config);
compiler.run(); // 标识运行编译
