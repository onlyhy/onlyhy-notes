import React from "react";
// import querystring from "querystring";
import MineDemo from "./MineDemo";
const Mine = (props) => {
  //   const params = new URLSearchParams(props.location.search);
  //   console.log(params.get("name"));
  //   console.log(params.get("age"));
  //   const params = querystring.parse(props.location.search.slice(1));
  //   console.log(params.name, params.age);
  const clickHandle = () => {
    console.log("点击", props);
    props.history.push("/"); //叠加，上一次的页面仍然存在
    // props.history.replace("/"); //替换，上一次的页面不存在了
  };
  return (
    <div>
      Mine<button onClick={clickHandle}>回到首页</button>
      <MineDemo></MineDemo>
    </div>
  );
};

export default Mine;
