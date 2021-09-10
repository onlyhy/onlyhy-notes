import React from 'react';
class ProxyDemo extends React.Component {
    /*
    跨域的解决方案：
    开发模式下：
        利用环境解决
    生产模式下：
        jsonp  cors  iframe  postMessage...
    */
    // 利用proxy解决 不知道为啥没起效果... - - |||
    // 手动配置  https://github.com/facebook/create-react-app/blob/main/docusaurus/docs/proxying-api-requests-in-development.md
    componentDidMount(){
        // 域名被proxy替换
        // fetch('/api/topics/hot.json')
        // .then(res=>res.json())
        // .then(data=>{console.log(data)})
        // .catch(error=>{
        //     console.log(new Error(error));
        // })
        // fetch('/api/list')
        // .then(res=>res.json())
        // .then(data=>{console.log(data)})
        // .catch(error=>{
        //     console.log(new Error(error));
        // })
    }
    render() { 
        return <div>proxy</div>;
    }
}
 
export default ProxyDemo;