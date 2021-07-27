// rollup的配置
import path from 'path';
import json from '@rollup/plugin-json';
// 解析第三方模块插件
import resolvePlugin from '@rollup/plugin-node-resolve';
// ts插件
import ts from 'rollup-plugin-typescript2';

// 根据环境变量中的target属性  获取对应模块中的package.json

const packagesDir = path.resolve(__dirname,'packages'); //找到packages文件夹

// packageDir 打包的基准目录
const packageDir = path.resolve(packagesDir,process.env.TARGET); //找到要打包的某个包

// 封装一下
const resolve=(p)=>path.resolve(packageDir,p)

const pkg = require(resolve('package.json'))

// 文件名
const dirName = path.basename(packageDir);

// 对打包类型做一个映射表，根据package.json提供的formats 来格式化需要打包的内容
const outputConfig = {
    'esm-bundler':{
        file:resolve(`dist/${dirName}.esm-bundler.js`),
        format:'es'
    },
    'cjs':{
        file:resolve(`dist/${dirName}.cjs.js`),
        format:'cjs'
    },
    'global':{
        file:resolve(`dist/${dirName}.global.js`),
        format:'iife'  //立即执行函数
    }
}

const options = pkg.buildOptions;// 自己在package.json中自定义的选项

function createConfig(format,output){
    output.name = options.name;
    output.sourcemap = true; //生成sourcemap
    // 生成rollup配置，参考文档
    return{
        input: resolve('src/index.ts'),
        output,
        // plugin是从上到下依次执行的
        plugins:[
            json(),
            ts({
                tsconfig:path.resolve(__dirname,'tsconfig.json')
            }),
            resolvePlugin()
        ]
    }
}


export default options.formats.map((format)=>{
   return createConfig(format,outputConfig[format])
})