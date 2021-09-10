import "./App.css";
import Home from "./pages/Home";
import Mine from "./pages/Mine";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Nav from "./components/Nav";
import UCenter from "./pages/UCenter";
import NotFound from "./pages/NotFound";
import Demo from "./pages/Demo";
import Shop from "./pages/Shop";
import Book from "./pages/Book";
import WebBook from "./pages/WebBook";
import JavaBook from "./pages/JavaBook";

// /mine/ucenter
function App() {
  return (
    <div className="App">
      <Router>
        <Nav></Nav>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route strict exact path="/mine" component={Mine}></Route>
          <Redirect from="/hellomine" to="/mine"></Redirect>
          <Route path="/shop" component={Shop}></Route>
          <Route
            strict
            exact
            path="/mine/ucenter/:id?/:name?"
            component={UCenter}
          ></Route>
          <Route path="/demo" render={() => <div>demo</div>}></Route>
          {/* <Route path="/demoooo" render={() => <Demo />}></Route> */}
          <Route
            path="/demoooo"
            render={(props) => <Demo {...props} name="你好" />}
          ></Route>
          {/* <Route path="/book" component={Book}></Route> */}
          <Book>
            <Switch>
              <Route path="/book/webbook" component={WebBook}></Route>
              <Route path="/book/javabook" component={JavaBook}></Route>
            </Switch>
          </Book>
          <Route component={NotFound}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
