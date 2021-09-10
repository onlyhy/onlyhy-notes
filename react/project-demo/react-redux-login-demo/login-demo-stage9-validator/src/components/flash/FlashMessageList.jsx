import React from "react";
import FlashMessage from "./FlashMessage";
import { connect } from "react-redux";
import { deleteFlashMessage } from "../../actions/flashMessages";
class FlashMessageList extends React.Component {
  render() {
    const messages = this.props.messages.map(message => {
      return (
        <FlashMessage
          key={message.id}
          message={message}
          deleteFlashMessage={this.props.deleteFlashMessage}
        ></FlashMessage>
      );
    });
    return <div className="container">{messages}</div>;
  }
}
const mapStateToProps = state => {
  return {
    messages: state.flashMessages,
  };
};

export default connect(mapStateToProps, { deleteFlashMessage })(
  FlashMessageList
);
