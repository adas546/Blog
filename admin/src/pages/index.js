// rfc: 快速构建函数组件
// 主组件就用文件名大写,需要用路由的组件都在pages这里
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import AdminIndex from "./AdminIndex";

export default function Pages() {
  return (
    <Router>
      {/* 外面还需要套一个Routes */}
      <Routes>
        {/*exact:防止匹配到不正确的路由  */}
        {/* 默认首先应该到注册位置 */}
        <Route path="/" exact element={<Login />} />
        {/* 做多级路由匹配，最外面的必须要加个/* */}
        <Route path="/index/*" element={<AdminIndex />} />
        {/* 默认转到login模块 */}
        <Route path="/*" element={<Login />} />
      </Routes>
    </Router>
  );
}
