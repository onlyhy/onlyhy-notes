import React from "react";
import classnames from "classnames";
import { withRouter } from "react-router-dom";
class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      errors: {},
      isLoading: false,
    };
  }
  onChange = e => {
    this.setState({
      // 这样可以让输入框共用方法
      [e.target.name]: e.target.value,
    });
  };
  onSubmit = e => {
    // submit默认会刷新一下页面
    e.preventDefault();
    // 请求时，注册按钮不可点，请求结束后再恢复可点
    this.setState({ errors: {}, isLoading: true });
    this.props.signupActions.userSignupRequest(this.state).then(
      () => {
        // this.setState({ isLoading: false });
        // 添加数据到redux
        this.props.flashActions.addFlashMessage({
          type: "success",
          text: "注册成功，欢迎你的加入！",
        });
        // history需要父组件传过来，因为SignupForm自身不是路由
        // 或者引用withRouter，嵌套在组件上
        this.props.history.push("/");
      },
      ({ response }) => {
        this.setState({
          errors: response.data,
          isLoading: false,
        });
      }
    );
  };
  render() {
    const { errors, isLoading } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <h1>加入我们</h1>
        <div className="form-group">
          <label className="control-label">Username</label>
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.onChange}
            className={classnames("form-control", {
              "is-invalid": errors.username,
            })}
          />
          {errors.username && (
            <span className="form-text text-muted">{errors.username}</span>
          )}
        </div>
        <div className="form-group">
          <label className="control-label">Email</label>
          <input
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.onChange}
            className={classnames("form-control", {
              "is-invalid": errors.email,
            })}
          />
          {errors.email && (
            <span className="form-text text-muted">{errors.email}</span>
          )}
        </div>
        <div className="form-group">
          <label className="control-label">Password</label>
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
            className={classnames("form-control", {
              "is-invalid": errors.password,
            })}
          />
          {errors.password && (
            <span className="form-text text-muted">{errors.password}</span>
          )}
        </div>
        <div className="form-group">
          <label className="control-label">PasswordConfirmation</label>
          <input
            type="password"
            name="passwordConfirmation"
            value={this.state.passwordConfirmation}
            onChange={this.onChange}
            className={classnames("form-control", {
              "is-invalid": errors.passwordConfirmation,
            })}
          />
          {errors.passwordConfirmation && (
            <span className="form-text text-muted">
              {errors.passwordConfirmation}
            </span>
          )}
        </div>
        <div className="form-group">
          <button disabled={isLoading} className="btn btn-primary btn-lg">
            注册
          </button>
        </div>
      </form>
    );
  }
}

export default withRouter(SignupForm);
