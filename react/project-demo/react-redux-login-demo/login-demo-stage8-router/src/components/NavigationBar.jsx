import React from "react";
import { Link } from "react-router-dom";
class NavgationBar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Login功能
          </Link>
          {/* <button
            className="navbar-toggle"
            type="button"
            data-toggle="collapse"
            data-target="#navbarExample05"
          >
            <span className="navbar-toggler-icon"></span>
          </button> */}
          <div className="collapse navbar-collapse" id="navbarExample05">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/signup">
                  注册
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavgationBar;
