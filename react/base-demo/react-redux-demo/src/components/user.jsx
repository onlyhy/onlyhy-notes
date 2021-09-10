import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "../actions/user";

class User extends React.Component {
  render() {
    const { error, isFetching, user } = this.props.user;
    let data;
    if (error) {
      data = error;
    } else if (isFetching) {
      data = "Loading...";
    } else {
      data = user.title;
    }
    return (
      <div>
        user
        {/* 测试数据是user:{title:''...},不重要 */}
        {/* <p>{this.props.user.user.title}</p> */}
        <p>{data}</p>
        <button onClick={() => this.props.userActions.get_user()}>
          get接口
        </button>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    userActions: bindActionCreators(userActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
