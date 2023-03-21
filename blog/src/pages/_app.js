// 所有页面的整体文件
import App from "next/app";
// import "antd/dist/reset.css";css文件可以在node_modules中找到，已经不是antd.css了
// antd现在已经支持按需引入css了，因此上面这不需要了
// next.js中没有明写html页面，都在这里的
import "../../public/css/pages/index.css";
import "../../public/css/antd.css";
import "../../public/css/code.css";
import "../../public/css/reset.css";
export default App;
