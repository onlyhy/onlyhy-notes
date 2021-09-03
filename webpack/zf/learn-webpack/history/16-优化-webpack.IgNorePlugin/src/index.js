import jquery from 'jquery'
import moment from 'moment'
// 设置语言

// 手动引入所需要语言(因为在webpack.config.js优化中过滤了语言包)
import 'moment/locale/zh-cn'

moment.locale('zh-cn')
let r = moment().endOf('day').fromNow();
console.log(r)