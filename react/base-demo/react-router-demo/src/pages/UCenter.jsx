import React from "react";

class UCenter extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }
  render() {
    return <div>UCenter:{this.props.match.params.id}</div>;
  }
}

export default UCenter;
