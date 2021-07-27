import {
  extend,
  isObject,
  isArray,
  isIntegerKey,
  hasOwn,
  hasChanged,
} from "./../../shared/src/index";
import { track, trigger } from "./effect";
import { reactive, readonly } from "./reactive";
import { TrackOpTypes, TriggerOpTypes } from "./operations";

// 实现new Proxy(target, handler)
// 是不是只读的，只读的属性set时会报异常
// 是不是深度的

// 拦截获取功能
function createGetter(isReadonly = false, shallow = false) {
  return function get(target, key, receiver) {
    // proxy + reflect
    // 后续Object上的方法，会被迁移到Reflect
    const res = Reflect.get(target, key, receiver); // target[key]
    if (!isReadonly) {
      // 非只读，值可能会改变，收集依赖，等数据变化后更新对应的视图
      console.log("执行effect时会取值", "收集effect");
      track(target, TrackOpTypes.GET, key);
    }

    if (shallow) {
      return res;
    }

    if (isObject(res)) {
      // vue2是一上来就递归，vue3是当取值时进行代理，vue3的代理模式是懒代理
      return isReadonly ? readonly(res) : reactive(res);
    }
    return res;
  };
}
// 拦截设置功能
function createSetter(shallow = false) {
  return function set(target, key, value, receiver) {
    // 获取老值
    const oldValue = target[key];
    // 是数组且修改的是索引? 是否新增? 是否为修改？（用key即索引和数组的length相比）
    let hadKey =
      isArray(target) && isIntegerKey(key)
        ? Number(key) < target.length
        : hasOwn(target, key);

    const result = Reflect.set(target, key, value, receiver); // target[key] = value

    if (!hadKey) {
      // 新增
      trigger(target, TriggerOpTypes.ADD, key, value);
    } else if (hasChanged(oldValue, value)) {
      // 新旧值不相等
      // 修改
      trigger(target, TriggerOpTypes.SET, key, value, oldValue);
    }
    // target[key] = value方法设置值可能会失败，不会报异常，也没有返回值标识
    // Reflect方法具备返回值

    // 当数据更新时 通知对应属性的effect重新执行
    // 区分新增还是修改  vue2无法监控更改索引  无法监控数组的长度
    return result;
  };
}

const get = createGetter();
const shallowGet = createGetter(false, true);
const readonlyGet = createGetter(true, false);
const shallowReadonlyGet = createGetter(true, true);

const set = createSetter();
const shallowSet = createSetter(true);

export const mutableHandlers = {
  get,
  set,
};
export const shallowReactiveHandlers = {
  get: shallowGet,
  set: shallowSet,
};

let readonlyObj = {
  set: (target, key) => {
    console.warn(`set on key ${key} failed`);
  },
};

export const readonlyHandlers = extend(
  {
    get: readonlyGet,
  },
  readonlyObj
);

export const shallowReadonlyHandlers = extend(
  {
    get: shallowReadonlyGet,
  },
  readonlyObj
);
