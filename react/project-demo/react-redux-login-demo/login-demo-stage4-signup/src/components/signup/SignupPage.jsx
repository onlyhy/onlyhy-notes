import React from "react";
import SignupForm from "./SignupForm";

class SignupPage extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <SignupForm></SignupForm>
        </div>
        <div className="col-md-3"></div>
      </div>
    );
  }
}

export default SignupPage;
