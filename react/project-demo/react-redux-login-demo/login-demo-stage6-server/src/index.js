import React from "react";
import ReactDOM from "react-dom";
// import App from "./App";
import reportWebVitals from "./reportWebVitals";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import rootReducers from "./reducers";
import routes from "./routes";
import { BrowserRouter as Router } from "react-router-dom";
import NavgationBar from "./components/NavigationBar";
const store = createStore(
  rootReducers,
  {},
  composeWithDevTools(applyMiddleware(logger, thunk))
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router routes={routes}>
        <NavgationBar></NavgationBar>
        {routes}
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
