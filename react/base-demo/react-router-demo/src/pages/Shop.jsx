import React from "react";
import { Prompt, Redirect } from "react-router-dom";
class Shop extends React.Component {
  state = {
    isLogin: true,
    name: "",
  };
  render() {
    const { isLogin } = this.state;
    return (
      <div>
        {/* {isLogin ? <div>shop</div> : <Redirect to="/"></Redirect>} */}
        <Prompt when={!!this.state.name} message="确定要离开吗？" />
        <input
          type="text"
          value={this.state.name}
          onChange={(e) => {
            this.setState({ name: e.target.value });
          }}
        />
      </div>
    );
  }
}

export default Shop;
