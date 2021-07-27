// 把package目录下的所有包都进行打包

const fs = require("fs");
const execa = require("execa"); // 开启子进程 进行打包，最终还是使用rollup进行打包
// 获取packages下的文件
const targets = fs.readdirSync("packages").filter(f => {
  // 过滤，只获取文件夹
  if (!fs.statSync(`packages/${f}`).isDirectory()) {
    return false;
  }
  return true;
});

// 对目标进行依次打包，并行打包
async function build(target) {
  // rollup -c --environment TARGET:shared
  await execa("rollup", ["-c", "--environment", `TARGET:${target}`], {
    stdio: "inherit",
  }); // stdio:'inherit'子进程打包的信息共享给父进程
}

function runParallel(targets, iteratorFn) {
  const res = [];
  for (const item of targets) {
    // 并行打包（不是同步打包，因此不需要await）
    const p = iteratorFn(item);
    res.push(p);
  }
  return Promise.all(res);
}
runParallel(targets, build);
