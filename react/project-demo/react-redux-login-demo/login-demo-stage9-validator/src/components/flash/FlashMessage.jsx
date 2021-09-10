import React from "react";
import classnames from "classnames";
class FlashMessage extends React.Component {
  onClick = () => {
    this.props.deleteFlashMessage(this.props.message.id);
  };
  render() {
    // type:提示的类型
    // text:提示的文本
    const { type, text } = this.props.message;
    return (
      <div
        className={classnames("alert", {
          "alert-success": type === "success",
          "alert-danger": type === "danger",
        })}
      >
        {text}
        <button onClick={this.onClick} className="close">
          &times;
        </button>
      </div>
    );
  }
}

export default FlashMessage;
