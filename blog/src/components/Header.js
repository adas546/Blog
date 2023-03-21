// antd默认有24栅格系统，可以适配多种屏幕
// 后面这个Header的格式还需要再调一下，学完flex再来看看
// 动态header，即根据数据库里的种类，来渲染自己的首页icon
// list组件和index组件的defaultKey是不一样的
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
// 子组件的css，需要写成.module.css后缀名
// 使用module样式就需要引入了，然后用styles.的形式使用
import styles from "../styles/components/Header.module.css";
import { Row, Col, Menu } from "antd";
import Router from "next/router";
import Link from "next/link";
import servicePath from "config/apiUrl";
import Icon from "./Icon";

const Header = (props) => {
  // useRouter函数必须用在组件中
  const router = useRouter();
  const [navArray, setNavArray] = useState([]);
  const [selectedKey, setSelectedKey] = useState(router.query.typeid);
  useEffect(() => {
    // 这里获取数据展示，其实这里都不是willUnmount，应该是mount
    const fetchData = async () => {
      // 两个都要有await，否则会报错
      const result = await fetch(servicePath.getTypeInfo);
      const data = await result.json();
      setNavArray(data.data);
    };
    fetchData();
    // 滚动显示
    // 滚动条监听导航滑动消失与出现
    let scrollheight = 0;
    window.onscroll = function () {
      //变量t是滚动条滚动时，距离顶部的距离
      let t = document.documentElement.scrollTop || document.body.scrollTop;
      let scrollup = document.getElementById("scrolldisplay");
      //当滚动到距离顶部200px时，返回顶部的锚点显示
      if (t >= 100) {
        if (t - scrollheight < 0) {
          scrollup.style.marginTop = "0";
          scrollheight = t;
        } else {
          scrollup.style.marginTop = "-3.2rem";
          scrollheight = t;
        }
      } else {
        //恢复正常
        scrollup.style.marginTop = "0";
        scrollheight = t;
      }
    };
  }, []);
  // 导航栏
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  let items = [];
  items.push(getItem("首页", 0, <Icon icon="home" />));
  for (let nav of navArray) {
    items.push(getItem(nav.typeName, nav.orderNum, <Icon icon={nav.icon} />));
  }
  items = items.sort((item1, item2) => {
    // console.log(item2.key, item1.key);
    return item1.key - item2.key;
  });

  //跳转到列表页
  const handleClick = (e) => {
    setSelectedKey(e.key);
    if (e.key === "0") {
      // index.js要访问，不是用/index，而是直接/
      // e是事件对象,e.key是组件指定的key值
      Router.push("/");
    } else {
      // 注意这里因为是服务端渲染，所以是defaultkey会出现还是主页的情况
      Router.push("/list?typeid=" + e.key);
    }
  };
  // 将Type传给传给list
  if (props.getType) {
    let type = "";
    for (let nav of navArray) {
      if (nav.orderNum.toString() === selectedKey) {
        type = nav.typeName;
        break;
      }
    }
    if (type === "") type = "视频教程";
    props.getType(type);
  }
  return (
    <div className={styles.header} id="scrolldisplay">
      {/* 使用flex布局，可以默认主轴居中对齐,默认align是top */}
      <Row type="flex" justify="center">
        {/* antd是24栅格法,这里是从小到大写 */}
        <Col xs={0} sm={0} md={10} lg={10} xl={10}>
          <span className={styles.header_logo}>时间序列小杰</span>
          <span className={styles.header_txt}>学习记录博客</span>
        </Col>
        {/* 当最小时，只有它了 */}
        <Col xs={16} sm={16} md={0} lg={0} xl={0}>
          <span
            className={styles.header_logo}
            style={{
              textAlign: "center",
              display: "block",
              fontSize: "1.1rem",
              color: "#fff",
              fontWeight: 700,
            }}
          >
            时间序列小杰的个人博客
          </span>
        </Col>
        {/* 不规定xs,sm,md,lg,xl，就会默认是折叠状态 */}
        {/* 前面两个相当于手机上, 中间相当于平板*/}
        {/* 图标自己有高度，为了合适需要修改height */}
        {/* 小的时候，右边就全部压缩了 */}
        <Col
          className={styles.ant_menu_item}
          xs={4}
          sm={4}
          md={14}
          lg={8}
          xl={8}
        >
          <Menu
            mode="horizontal"
            defaultSelectedKeys={selectedKey}
            items={items}
            onClick={handleClick}
            theme="dark"
            style={{ backgroundColor: "rgba(40,54,70,0)" }}
          ></Menu>
        </Col>
      </Row>
    </div>
  );
};

export default Header;
