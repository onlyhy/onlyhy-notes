import "./App.css";
import Parent from "./components/coms/Parent";
import { connect } from "react-redux";
// import { increment, decrement } from "./actions/counter";
import * as counterActions from "./actions/counter";
// import { addUser } from "./actions/user";
import { bindActionCreators } from "redux";
import User from "./components/user";

// connect 把App组件与redux连接起来

function App(props) {
  console.log(props);
  return (
    <div className="App">
      Hello redux<Parent></Parent>
      <h1>{props.counter}</h1>
      {/* <h1>{props.value}</h1> */}
      {/* <button onClick={props.onInCrement}>increment</button>
      <button onClick={props.onDeCrement}>decrement</button> */}
      {/* <button onClick={props.increment}>increment</button>
      <button onClick={props.decrement}>decrement</button> */}
      <button onClick={() => props.counterActions.increment(3)}>
        increment
      </button>
      <button onClick={() => props.counterActions.decrement(3)}>
        decrement
      </button>
      <button onClick={() => props.addUser()}>添加user</button>
      <ul>
        {/* {props.user.map((el, index) => {
          return <li key={index}>{el}</li>;
        })} */}
      </ul>
      {/* {props.user} */}
      <User></User>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    counter: state.counter,
    user: state.user,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     increment: () => {
//       dispatch(increment());
//     },
//     decrement: () => {
//       dispatch(decrement());
//     },
//   };
// };

const mapDispatchToProps = dispatch => {
  return {
    counterActions: bindActionCreators(counterActions, dispatch),
    // addUser: () => {
    //   dispatch(addUser());
    // },
  };
};

// connect参数的先后顺序不可颠倒
export default connect(mapStateToProps, mapDispatchToProps)(App);
