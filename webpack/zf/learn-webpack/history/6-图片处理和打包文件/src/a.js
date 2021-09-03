module.exports = 'zfpx';
require('@babel/polyfill'); // 实现一些js原型没有的方法 如 'aaa'.includes('a')
class B {

}

function * gen(params) {
    yield 1
}
console.log(gen().next());

'aaa'.includes('a');


