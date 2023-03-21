// 利用useRef何useEffect实现update
import React, { useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import Head from "next/head";
// 现在默认支持按需导入，不需要建立babelrc文件了
// Breadcrumb:面包屑导航
// 组件向后台获取到数据之后，不会刷新加载页面，而是把数据填入进去，即虽然url变了，但还是这个组件，组件本质没变,不会重新加载
// 这个是函数组件，组件里的函数会全部执行，但useState不会执行，也验证了组件并没有被重新渲染，而只是数据变了而已
import {
  List,
  Row,
  Col,
  Breadcrumb,
  FloatButton,
  Input,
  message,
  Pagination,
  Space,
} from "antd";
import { RocketOutlined } from "@ant-design/icons";
import LazyLoad from "react-lazyload";
// import Header from "@/components/Header";
// import Author from "@/components/Author";
// import Advert from "@/components/Advert";
// import Footer from "@/components/Footer";
// import Icon from "../components/Icon";
import servicePath from "config/apiUrl";
import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";
import styles from "../styles/pages/list.module.css";

const Header = React.lazy(() => import("@/components/Header"));
const Author = React.lazy(() => import("@/components/Author"));
const Footer = React.lazy(() => import("@/components/Footer"));
const Icon = React.lazy(() => import("@/components/Icon"));
const { Search } = Input;
// type_id和id不一样，type_id是区分每条博客的属性的，id是每条博客的唯一属性
// list是根据type_id渲染的
// 文章搜索和重新获取数据都不会调用useState，但是前者需要用的,需要在props里区分下
// 这里react理解上，是重新获取了数据，然后渲染。自然就不会在调用useState和useEffect钩子了
// nextjs调用getServerSideProps是先预渲染页面的，自然重新导入data无影响
// md，nextjs不认为重新输入data状态发生变化了
const Mylist = (props) => {
  const data = props.data;
  const [type, setType] = useState("视频教程");
  const [current, setCurrent] = useState(1); //当前页数
  //非置顶文章根据日期排序
  let compare = function (obj1, obj2) {
    let val1 = new Date(obj1.addTime);
    let val2 = new Date(obj2.addTime);
    if (val1 < val2) {
      return -1;
    } else if (val1 > val2) {
      return 1;
    } else {
      return 0;
    }
  };
  // 文章按照日期排序
  let blogData = data.sort(compare).reverse();
  const [blogList, setBlogList] = useState(blogData);
  // 这里得加个判断，如果是点击了导航栏，BlogList要重新设置
  // if (blogList !== blogData) setBlogList(blogData);
  // 测试2个来分页
  // setpageData(blogList.slice(current, current + 2));
  // 不加[],默认会监视所有组件是否有改变，监视data就行
  // 搜索框支持enter按键的
  useEffect(() => {
    // markdown可以在组件搭建完成时使用，避免重新渲染时反复运行
    const renderer = new marked.Renderer();
    marked.setOptions({
      renderer: renderer,
      // 采取github的格式
      gfm: true,
      // 如果markdown语法有错，就进行修改
      pedantic: false,
      // 要插入视频啥的，就要写false
      sanitize: false,
      tables: true,
      breaks: true,
      // 自动渲染列表
      smartLists: true,
      // 如何高亮代码
      highlight: function (code) {
        return hljs.highlightAuto(code).value;
      },
    });
    document.title = "博客详情页 | 时间序列小杰的个人博客";
  }, []);

  useEffect(() => {
    setBlogList(blogData);
  }, [data]);
  const searchInput = (searchContent) => {
    if (searchContent.length <= 0) return;
    searchContent = searchContent.toLowerCase(); //搜索内容统一转换大写
    let res = [];
    blogData.map((item) => {
      let allInfo = (
        item.title.toString() +
        item.introduce +
        item.addTime.toString()
      ).toLowerCase();
      if (allInfo.indexOf(searchContent) !== -1) {
        res.push(item);
      }
    });
    setBlogList(res);
  };

  // 分页加载
  const bottombtn = (e) => {
    // console.log(e); //当前页数
    // let data = blogList;
    // let bottomdata = blogList.slice((e - 1) * 10, e * 10);
    setCurrent(e);
    // setBottomData(bottomdata);
    // nextjs的id是__next，可以从网页的f12看出来,两根下划线
    document.getElementById("__next").scrollIntoView(true); //为ture返回顶部，false为底部
  };

  // console.log(blogList);
  return (
    <div style={{ position: "relative" }}>
      <Suspense>
        <div className="bkg_image"></div>
        <FloatButton.BackTop icon={<RocketOutlined />} />
        <Header getType={setType} />
        <Row
          className="comm-main"
          type="flex"
          justify="center"
          style={{ paddingTop: "3.2rem" }}
        >
          <Col
            className="comm-left"
            xs={24}
            sm={24}
            md={16}
            lg={18}
            xl={14}
            style={{ backgroundColor: "rgba(255,255,255,0.3)" }}
          >
            <div className="bread-div">
              {/* 加这个可以返回首页 */}
              <Breadcrumb>
                <Breadcrumb.Item>
                  <Link href="/">首页</Link>
                </Breadcrumb.Item>
                {/* 这里可以加一个接口，返回type_id对应的实际名字 */}
                <Breadcrumb.Item>{type}</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <List
              header={
                <Row>
                  <Col xs={12} sm={14} md={15} lg={17} xl={17}>
                    <div
                      style={{
                        fontWeight: "bold",
                        paddingLeft: 20,
                        lineHeight: "32px",
                      }}
                    >
                      {type} <span style={{ color: "red" }}>{data.length}</span>{" "}
                      篇
                    </div>
                  </Col>
                  <Col xs={11} sm={9} md={8} lg={6} xl={6}>
                    <Search placeholder="搜索博客内容" onSearch={searchInput} />
                  </Col>
                  <Col xs={1} sm={1} md={1} lg={1} xl={1}></Col>
                </Row>
              }
              itemLayout="vertical"
              // 从0开始计数的
              dataSource={blogList.slice(current - 1, current + 9)}
              renderItem={(item, index) => (
                <List.Item key={index} className={styles.cssnicehover}>
                  <LazyLoad height={200} offset={-200}>
                    <div className={styles.cssnice1}>
                      <div>
                        <Link
                          href={{ pathname: "/detail", query: { id: item.id } }}
                          className={styles.list_title}
                        >
                          {item.title}
                        </Link>
                      </div>
                      {/* 三个图标的摆放 */}
                      <div>
                        <Space align="center">
                          <span>
                            <Space>
                              <Icon icon="calendar" />
                              <span className={styles.icon}>
                                {item.addTime.slice(0, 10)}
                              </span>
                            </Space>
                          </span>
                          <span>
                            <Space>
                              <Icon icon="folder" />
                              <span className={styles.icon}>
                                {item.typeName}
                              </span>
                            </Space>
                          </span>
                          <span>
                            <Space>
                              <Icon icon="fire" />
                              <span className={styles.icon}>{666}</span>
                            </Space>
                          </span>
                        </Space>
                      </div>
                      <div
                        className={styles.list_contxt}
                        dangerouslySetInnerHTML={{
                          __html: marked(item.introduce),
                        }}
                      ></div>
                      {/* 查看全文 */}
                      <div
                        className="details"
                        style={{
                          textAlign: "right",
                          marginRight: 20,
                          fontSize: 15,
                          color: "#1e90ff",
                          position: "relative",
                        }}
                      >
                        <Link
                          href={{ pathname: "/detail", query: { id: item.id } }}
                        >
                          <Icon icon="fullscreen" style={{ marginRight: 10 }} />
                          <span>查看全文 》</span>
                        </Link>
                      </div>
                    </div>
                  </LazyLoad>
                </List.Item>
              )}
            />
            {/* {console.log(blogList.length)} */}
            <Pagination
              showQuickJumper
              defaultCurrent={1}
              // 总页数必须要*10
              total={(Math.floor(blogList.length / 10) + 1) * 10}
              onChange={bottombtn}
              className="cssnice3"
              current={current}
              style={{ textAlign: "center", padding: ".5rem 0 .5rem" }}
            />
          </Col>
          <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
            <Author />
            {/* <Advert /> */}
          </Col>
        </Row>
        <Footer />
      </Suspense>
    </div>
  );
};

// nextjs不用写路由的,pages里配置好了的
// getStaticProps，会先处理了数据在渲染，看文档好像是都预渲染?
export async function getServerSideProps(ctx) {
  let typeid = ctx.query.typeid;
  // console.log(typeid);
  const res = await fetch(`${servicePath.getListByTypeId}?typeid=${typeid}`);
  // console.log(res);
  const data = await res.json();
  // data是一个对象，data.data才是需要的东西
  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data: data.data }, // will be passed to the page component as props
  };
}

export default Mylist;
