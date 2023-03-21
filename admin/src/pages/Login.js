import React, { useState, useEffect } from "react";
import "antd/dist/reset.css";
// spin:用于呈现页面和区块的加载中状态
import { Card, Input, Button, Spin, message } from "antd";
import Icon from "../components/Icon";
import react from "react";
import { useNavigate } from "react-router-dom";
// 导入中台路径
import servicePath from "../config/apiUrl";
import "../static/css/Login.css";
// 是fetch的问题吗?
import axios from "axios";
function Login(props) {
  // 初始值设置为空,注意初始值是给第一个参数的，不是给两个参数的。后面的参数是函数，用于重新render组件
  // username是自己设计的变量，setUsername可以重新渲染组件,""是给username的初始值
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  // isLoading:避免重复提交
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    // 会在标签那有显示
    document.title = "登录页 | 时间序列小杰的个人博客";
    console.log(1);
  }, []);
  const checkLogin = () => {
    if (!username) {
      message.error("用户名不能为空");
      return false; //不去服务端访问了
    } else if (!password) {
      message.error("密码不能为空");
      return false;
    }
    let dataProps = {
      userName: username,
      password: password,
    };
    // fetch不知道为啥不行
    // fetch(servicePath.checkLogin, {
    //   method: "post",
    //   mode: "no-cors",
    //   body: JSON.stringify(dataProps),
    //   headers: {
    //     "Content-Type": "application/json;charset=utf-8",
    //   },
    //   // 前端后端共享session
    //   credential: "include",
    // })
    // .then((res) => {
    //   console.log(res);
    //   return res.json();
    // })
    // .then((res) => {
    //   // const data = res.json();
    //   console.log(res);
    //   setIsLoading(false); //去掉loading框
    //   if (res.data === "登录成功") {
    //     localStorage.setItem("openId", res.openId); //将openId缓存起来
    //     // 编程导航形式进行跳转
    //     navigate("/index");
    //   } else {
    //     message.error("用户名密码错误");
    //   }
    // });
    axios({
      method: "post",
      url: servicePath.checkLogin,
      data: dataProps,
      withCredentials: true,
    }).then((res) => {
      setIsLoading(false);
      if (res.data.data == "登录成功") {
        // 本地存openId干啥呢?
        localStorage.setItem("openId", res.data.openId);
        navigate("/index");
      } else {
        message.error("用户名密码错误");
      }
    });
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="login_div">
      <Spin tip="Loading...." spinning={isLoading}>
        <Card
          title="时间序列小杰的博客后台系统"
          bordered={true}
          style={{
            width: "22rem",
            margin: "0 auto",
            backgroundColor: "rgba(255,255,255,.4)",
            textAlign: "center", // 修改标题的文字居中
          }}
        >
          <Input
            id="username"
            size="large"
            placeholder="Enter your userName"
            prefix={<Icon icon="user" style={{ color: "rgb(0,0,0,.25)" }} />}
            // e是react节点，这里用的是e的value数据
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <br />
          <br />
          {/* 专门有组件Password */}
          <Input.Password
            id="password"
            size="large"
            placeholder="Enter your password"
            prefix={<Icon icon="key" style={{ color: "rgb(0,0,0,.25)" }} />}
            // e是react节点，这里用的是e的value数据
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <br />
          <br />
          {/* 块状元素宽度默认是父元素的宽度 */}
          <Button type="primary" size="large" block onClick={checkLogin}>
            Login
          </Button>
        </Card>
      </Spin>
    </div>
  );
}

export default Login;
