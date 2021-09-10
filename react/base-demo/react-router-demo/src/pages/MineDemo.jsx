import React from "react";
import { withRouter } from "react-router";
class MineDemo extends React.Component {
  clickHandle() {
    // 当前组件没有直接被路由管理，所以没有路由对象
    // 这里会输出undefined
    console.log(this.props);
    // 使用withRouter
    this.props.history.push("/");
  }
  render() {
    return <button onClick={this.clickHandle.bind(this)}>回到home</button>;
  }
}

// 高阶组件
export default withRouter(MineDemo);
