import { isObject } from "@vue/shared";

import {
  mutableHandlers,
  shallowReactiveHandlers,
  readonlyHandlers,
  shallowReadonlyHandlers,
} from "./baseHandlers";

export function reactive(target) {
  return createReactiveObject(target, false, mutableHandlers);
}

export function shallowReactive(target) {
  return createReactiveObject(target, false, shallowReactiveHandlers);
}

export function readonly(target) {
  return createReactiveObject(target, true, readonlyHandlers);
}
 
// 浅的只读，第一层不能改，第二层且后面可以
export function shallowReadonly(target) {
  return createReactiveObject(target, true, shallowReadonlyHandlers);
}

// 是不是只读 是不是深度 柯里化  new Proxy()  最核心的需要拦截 数据的读取和数据的修改 get set

// WeakMap会自动垃圾回收，不会造成内存泄露，存储的key只能是对象
const reactiveMap = new WeakMap();
const readonlyMap = new WeakMap();
export function createReactiveObject(target, isReadonly, baseHandlers) {
  // 如果目标不是对象，就无法拦截，reactive这个api只能拦截对象类型
  // 不是对象就直接返回了，代理不了
  if (!isObject(target)) {
    return target;
  }
  //如果某个对象已经被代理过了，就不要再次代理了 可能一个对象 被代理是深度，又被只读代理了

  const proxyMap = isReadonly ? readonlyMap : reactiveMap;
  const existProxy = proxyMap.get(target);
  if (existProxy) {
    // 如果已经被代理了，直接返回即可
    return existProxy;
  }
  const proxy = new Proxy(target, baseHandlers);
  // 将要代理的对象 和 对应代理结果缓存起来
  proxyMap.set(target, proxy);

  return proxy;
}
