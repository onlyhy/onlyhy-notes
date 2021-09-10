import React from "react";
class Demo extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }
  render() {
    return <div>demoooooooo {this.props.name}</div>;
  }
}

export default Demo;
