import React from "react";
class Child extends React.Component {
  clickHandler = (e) => {
    this.props.onMyEvent("父标题");
  };
  render() {
    return (
      <div>
        child:{this.props.title}
        <button onClick={this.clickHandler}>传递数据</button>
      </div>
    );
  }
}

export default Child;
