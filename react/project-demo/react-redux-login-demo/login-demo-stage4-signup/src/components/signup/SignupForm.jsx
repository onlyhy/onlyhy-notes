import React from "react";
class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
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
    console.log(this.state);
  };
  render() {
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
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label className="control-label">Email</label>
          <input
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.onChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label className="control-label">Password</label>
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label className="control-label">P asswordConfirmation</label>
          <input
            type="password"
            name="passwordConfirmation"
            value={this.state.passwordConfirmation}
            onChange={this.onChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <button className="btn btn-primary btn-lg">注册</button>
        </div>
      </form>
    );
  }
}

export default SignupForm;
