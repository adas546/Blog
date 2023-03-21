import React, { useState, useEffect, Suspense } from "react";
import LazyLoad from "react-lazyload";
import Link from "next/link";
import axios from "axios";
import Head from "next/head";
// 现在默认支持按需导入，不需要建立babelrc文件了
// React内置了lazy函数，支持懒加载，使用方法为const OtherComponent = React.lazy(() => import('./OtherComponent'));
import {
  List,
  Row,
  Col,
  FloatButton,
  Input,
  message,
  Pagination,
  Space,
} from "antd";
// import Header from "@/components/Header";
// import Author from "@/components/Author";
// import Footer from "@/components/Footer";
import { RocketOutlined } from "@ant-design/icons";
// import Icon from "../components/Icon";
import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";
import styles from "../styles/pages/pages.module.css";
// 图标对齐这种的，还需要后面补充学习
// next.js内置支持.module.css，不支持直接导入css(除了_app.js文件和node_module文件夹中的css可以和以前一样导入)

// 注意这里要写return，或者不要写{},写了{},就要写return
// 等价于()=>()，返回一个页面的简化写法
// 这里就已经获取data了,next,js把获取数据和模块分开写了(在同一个页面中)
// 原生的react-lazy需要使用import
const { Search } = Input;
const Header = React.lazy(() => import("@/components/Header"));
const Author = React.lazy(() => import("@/components/Author"));
const Footer = React.lazy(() => import("@/components/Footer"));
const Icon = React.lazy(() => import("@/components/Icon"));

const Home = ({ data }) => {
  const [current, setCurrent] = useState(1); //当前页数
  const [search, setSearch] = useState(false); //是否在用search
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
  let blogData = data.data.sort(compare).reverse();
  const [blogList, setBlogList] = useState(blogData);
  useEffect(() => {
    // markdown可以在组件搭建完成时使用，避免重新渲染时反复运行
    const renderer = new marked.Renderer();
    marked.setOptions({
      renderer: renderer,
      // 采取github的格式
      gfm: true,
      //只解析符合Markdown定义的，不修正Markdown的错误。填写true或者false
      pedantic: false,
      //原始输出，忽略HTML标签，这个作为一个开发人员，一定要写flase
      sanitize: false,
      tables: true, //支持Github形式的表格，必须打开gfm选项
      breaks: true, //支持Github换行符，必须打开gfm选项，填写true或者false
      // 自动渲染列表
      smartLists: true, //优化列表输出，这个填写ture之后，你的样式会好看很多，所以建议设置成ture
      // 如何高亮代码
      highlight: function (code) {
        return hljs.highlightAuto(code).value;
      },
    });
    document.title = "博客详情页 | 时间序列小杰的个人博客";
  }, []);
  const searchInput = (searchContent) => {
    if (searchContent.length <= 0) {
      setBlogList(blogData); //输入为空，就是返回全部了
      return;
    }
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
    // console.log(blogList);
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

  return (
    <div style={{ position: "relative" }}>
      <Suspense>
        <div className="bkg_image"></div>
        {/* 这里的icon是antd提供的内置api，往下划点才有*/}
        <FloatButton.BackTop icon={<RocketOutlined />} />
        <Header />
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
                      博客日志{" "}
                      <span style={{ color: "red" }}>{data.data.length}</span>{" "}
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
              // 这里必须输入数组,然后item解析一个个
              dataSource={blogList.slice(current - 1, current + 9)}
              renderItem={(item, index) => {
                return (
                  <List.Item key={index} className={styles.cssnicehover}>
                    <LazyLoad height={200} offset={-200}>
                      <div className={styles.cssnice1}>
                        <div>
                          <Link
                            // 我自己取名是detail，不是detailed
                            href={{
                              pathname: "/detail",
                              query: { id: item.id },
                            }}
                            className={styles.list_title}
                          >
                            {item.title}
                          </Link>
                        </div>
                        {/* 三个标签 */}
                        <div>
                          <Space>
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
                                <span className={styles.icon}>{666}</span>人
                              </Space>
                            </span>
                          </Space>
                        </div>
                        {/* 具体内容 */}
                        <div
                          className="list_contxt"
                          dangerouslySetInnerHTML={{
                            __html: marked(item.introduce),
                          }}
                        ></div>
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
                            href={{
                              pathname: "/detail",
                              query: { id: item.id },
                            }}
                          >
                            <Icon
                              icon="fullscreen"
                              style={{ marginRight: 10 }}
                            />
                            <span>查看全文 》</span>
                          </Link>
                        </div>
                      </div>
                    </LazyLoad>
                  </List.Item>
                );
              }}
            />
            <Pagination
              showQuickJumper
              defaultCurrent={1}
              // 总页数必须要*10
              total={(Math.floor(blogList.length / 10) + 1) * 10}
              onChange={bottombtn}
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

export async function getStaticProps(context) {
  const res = await fetch(`http://localhost:7001/default/getArticleList`);
  const data = await res.json();
  // data是一个对象，data.data才是需要的东西
  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data }, // will be passed to the page component as props
  };
}

export default Home;
