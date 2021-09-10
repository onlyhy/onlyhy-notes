import React from "react";
import Child from "./Child";
class Parent extends React.Component {
  state = {
    value: "",
  };
  clickHandle = (data) => {
    this.setState({ value: data });
  };
  render() {
    return (
      <div>
        Parent:{this.state.value}
        <Child title="标题" onMyEvent={this.clickHandle}></Child>
      </div>
    );
  }
}

export default Parent;
