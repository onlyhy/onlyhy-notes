import React from "react";
import { NavLink } from "react-router-dom";
import "./style.css";
class Nav extends React.Component {
  render() {
    return (
      <div>
        <ul>
          <li>
            <NavLink exact to="/" activeClassName="selected">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              exact
              to={{
                pathname: "/mine",
                search: "?sort=name",
                hash: "#the-hash",
                state: { fromDashboard: true }, // 隐形传递参数，可自主修改
              }}
              activeStyle={{ color: "pink" }}
            >
              Mine
            </NavLink>
          </li>
          {/* <li>
            <NavLink exact to="/mine" activeStyle={{ color: "pink" }}>
              Mine
            </NavLink>
          </li> */}
          <li>
            <NavLink exact to="/mine/ucenter/123/hy">
              UCenter
            </NavLink>
          </li>
        </ul>
      </div>
    );
  }
}
export default Nav;
