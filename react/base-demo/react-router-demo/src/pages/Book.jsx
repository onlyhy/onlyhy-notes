import React from "react";
class Book extends React.Component {
  render() {
    return (
      <div>
        Book{/* 嵌套路由显示的位置*/}
        {this.props.children}
      </div>
    );
  }
}

export default Book;
