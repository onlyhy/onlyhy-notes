// 只针对具体的某个包打包

const fs = require('fs');
const execa = require('execa');  // 开启子进程 进行打包，最终还是使用rollup进行打包

const target = 'reactivity'

build(target)

async function build(target){// rollup -c --environment TARGET:shared
    await execa('rollup',['-cw','--environment',`TARGET:${target}`],{stdio:'inherit'}) // stdio:'inherit'子进程打包的信息共享给父进程
}

