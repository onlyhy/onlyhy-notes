import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
// import reducer from "./reducers/counter";
import { Provider } from "react-redux";
import rootReducer from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";

// // 自定义中间件
// const logger = store => next => action => {
//   console.log("dispatch->", action);
//   let result = next(action); //加载下一个中间件
//   console.log("next state->", store.getState());
//   return result;
// };

// // 自定义中间件
// const error = store => next => action => {
//   try {
//     next(action);
//   } catch (e) {
//     console.log("error->", e);
//   }
// };

// const store = createStore(rootReducer, {}, applyMiddleware(logger, error));
const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(logger, thunk))
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// // store.subscribe(() => {
// //   console.log("state", store.getState());
// // });

// const render = () => {
//   ReactDOM.render(
//     <React.StrictMode>
//       <App
//         onInCrement={() => store.dispatch({ type: "INCREMENT" })}
//         onDeCrement={() => store.dispatch({ type: "DECREMENT" })}
//         value={store.getState()}
//       />
//     </React.StrictMode>,
//     document.getElementById("root")
//   );
// };
// render();
// store.subscribe(render);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
