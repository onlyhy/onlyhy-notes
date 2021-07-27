// ref和reactive的区别:reactive内部采用proxy，ref内部采用的是defineProperty

import { hasChanged, isArray, isObject } from "@vue/shared";
import { track, trigger } from "./effect";
import { TrackOpTypes, TriggerOpTypes } from "./operations";
import { reactive } from "./reactive";

export function ref(value) {
  // value是一个普通类型 ，也可以是对象，但是一般情况对象用reactive更合理
  // 将普通类型变成一个对象
  return createRef(value);
}

// 判断shallow深浅  根据是否为对象的情况下 判断是否要用reactive处理
const convert = val => (isObject(val) ? reactive(val) : val);
// beta版本之前的版本ref就是个对象  由于对象不方便扩展 改成了类
// 这段代码转换成es5就是defineProperty
class RefImpl {
  public _value; // 声明了一个_value属性 但是没有赋值
  public __v_isRef = true; // 产生的实例会被添加__v_isRef，表示是一个ref属性
  // 使用public 可以让this获取到值
  // 参数中前面增加修饰符 标识此属性放到了实例上
  constructor(public rawValue, public shallow) {
    this._value = shallow ? rawValue : convert(rawValue); //如果是深度，需要把里面的都变成响应式
  }
  // 类的属性访问器
  // 代理  取值取value 会代理到_value上
  get value() {
    track(this, TrackOpTypes.GET, "value");
    return this._value;
  }
  set value(newValue) {
    // 判断老值和新值是否有变化
    if (hasChanged(newValue, this.rawValue)) {
      this.rawValue = newValue; // 新值会作为老值
      this._value = this.shallow ? newValue : convert(newValue);
      trigger(this, TriggerOpTypes.SET, "value", newValue);
    }
  }
}

export function shallowRef(value) {
  return createRef(value, true);
}

function createRef(rawValue, shallow = false) {
  return new RefImpl(rawValue, shallow);
}

class ObjectRefImpl {
  public __v_isRef = true; // 产生的实例会被添加__v_isRef，表示是一个ref属性
  constructor(public target, public key) {}
  get value() {
    // 代理
    // 如果原对象是响应式的 就会依赖收集
    return this.target[this.key];
  }
  set value(newValue) {
    // 如果原来对象是响应式的 那么就会触发更新
    this.target[this.key] = newValue;
  }
}

// ref和toRef没关系的  是两个类实现的
// 可以将一个对象的key的对应值变成ref类型
export function toRef(target, key) {
  return new ObjectRefImpl(target, key);
}

export function toRefs(object) {
  //object可能传递的是一个对象或者数组
  const ret = isArray(object) ? new Array(object.length) : {};
  for (let key in object) {
    ret[key] = toRef(object, key);
  }
  return ret;
}
