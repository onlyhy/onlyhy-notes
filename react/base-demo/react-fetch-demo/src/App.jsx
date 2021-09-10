import "./App.css";
import React from "react";
// nodejs提供
import qs from "querystring";
import ProxyDemo from './ProxyDemo';
import api from './api'

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      banners:[]
    }
  }
  componentDidMount(){
    // fetch基于promise
    // get
    fetch('http://iwenwiki.com/api/blueberrypai/getIndexBanner.php').then(res=>{
      return res.json()
    }).then(data => {
      this.setState({
        banners:data.banner
      })
  })

  // post
  fetch("http://iwenwiki.com/api/blueberrypai/login.php",{
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      "Accept":"application/json,text/plain,*/*"
    },
  // 字符串类型的参数 与content-type对应
    body:qs.stringify({
      user_id:"iwen@qq.com",
      password:"iwen123",
      verification_code:"crfvw"
    })
    // body:"user_id=iwen@qq.com&password=iwen123&verification_code=crfvw"
  }).then(res=>res.json())
  .then(data=>console.log(data))

  api.getChengpin().then(res=>res.json()).then(data=>console.log(data))
  api.getLogin({
    user_id:"iwen@qq.com",
    password:"iwen123",
    verification_code:"crfvw"
  }).then(res=>res.json()).then(data=>console.log(data))

}
  render() {
    const {banners} = this.state;
    return (<div>
      {
        banners.length>0 ? <ul>{
          banners.map((el,index)=>{
            return  <li key={index}>{el.title}</li>
          })}</ul> :<div>等待数据加载...</div>
      }
      <ProxyDemo />
    </div>);
  }
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
