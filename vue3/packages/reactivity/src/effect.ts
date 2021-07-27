import { isArray, isIntegerKey } from "./../../shared/src/index";
import { TriggerOpTypes } from "./operations";
export function effect(fn, options: any = {}) {
  // 让effect变成响应的effect， 可以做到数据变化重新执行
  const effect = createReactiveEffect(fn, options);
  if (!options.lazy) {
    effect(); // 响应式的effct默认会先执行一次
  }
  return effect;
}

let uid = 0;
let activeEffect; //存储当前正在运行的effect
const effectStack = []; // 使用栈，保证使用的effect顺序正确，使得activeEffect永远指向当前正确的effect
function createReactiveEffect(fn, options) {
  const effect = function reactiveEffect() {
    // 判断栈里是否已经有这个effect，没有则入栈
    if (!effectStack.includes(effect)) {
      //保证effect之前没有加入到effectStack中
      try {
        console.log("执行effect...");
        // 入栈
        effectStack.push(effect);
        activeEffect = effect;
        return fn(); //函数执行时会取值，会执行get方法
      } finally {
        // 出栈
        effectStack.pop();
        activeEffect = effectStack[effectStack.length - 1];
      }
    }
  };
  effect.id = uid++; // 制作一个effect标识，用于区分effect
  effect._isEffect = true; // 用于标识这个是响应式effect
  effect.raw = fn; // 保留effct对应的原函数
  effect.options = options; // 保存属性
  return effect;
}

// 让某个对象中的属性 收集当前它对应的effect函数  依赖收集
const targetMap = new WeakMap();
export function track(target, type, key) {
  //   console.log(target, key, activeEffect);
  if (activeEffect === undefined) {
    // 说明此属性不用收集依赖，因为没有在effect中使用
    return;
  }
  // 假设{name:'zf',age:12}
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()));
  }
  // 假设看有无name
  let dep = depsMap.get(key);
  if (!dep) {
    // dep使用new Set赋值，是因为可能有多个effect使用了这个key（假设上面举例中的name），所以使用Set来维护
    depsMap.set(key, (dep = new Set()));
  }
  // 加上effect
  if (!dep.has(activeEffect)) {
    dep.add(activeEffect);
  }
  console.log(targetMap);
}

// weakMap: key {name:'zf',age:12} value (map)=>{name=>set,age=>set}

// 触发更新  找属性对应的effect，让其执行   数组、对象等..
export function trigger(target, type, key?, newValue?, oldValue?) {
  console.log(target, type, key, newValue, oldValue);
  // 如果这个属性没有收集过effect，不需要做任何操作
  const depsMap = targetMap.get(target);
  if (!depsMap) return;
  // 将所有要执行的effect全部存到一个新的集合中，最终一起执行
  const effects = new Set(); // 这里对effects去重了
  const add = effectsToAdd => {
    if (effectsToAdd) {
      effectsToAdd.forEach(effect => effects.add(effect));
    }
  };
  // 1、看修改的是不是数组的长度，改长度影响大
  if (key === "length" && isArray(target)) {
    // 如果对应的长度有依赖收集  需要更新
    depsMap.forEach((dep, key) => {
      if (key === "length" || key > newValue) {
        // 如果更改后的长度 小于收集的索引 那么这个索引也需要触发effect重新执行
        // 例如：state.arr.length = 1, 1就是newValue,而引用的是state.arr[2], 2比1大
        add(dep);
      }
    });
  } else {
    // 可能是对象
    if (key !== undefined) {
      // 修改
      // 收集过，直接触发
      add(depsMap.get(key));
    }
    // 如果修改数组中的某一个索引
    // 如果添加了一个索引，就触发长度length的更新
    switch (type) {
      case TriggerOpTypes.ADD:
        if (isArray(target) && isIntegerKey(key)) {
          add(depsMap.get("length"));
        }
    }
  }
  // 将所有要执行的effect全部存到一个新的集合中，最终一起执行
  effects.forEach((effect: any) => effect());
}
