// 详细页
import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Head from "next/head";
// 现在默认支持按需导入，不需要建立babelrc文件了
// 引入图标需要给定图标左移的距离
// Affix:固定效果
// 后面改用marked + highlight.js？
import {
  Row,
  Col,
  Breadcrumb,
  Affix,
  FloatButton,
  Spin,
  Space,
  Divider,
} from "antd";
import { RocketOutlined } from "@ant-design/icons";
// import Icon from "../components/Icon";
// import Header from "@/components/Header";
// import Author from "@/components/Author";
// import Advert from "@/components/Advert";
// import Footer from "@/components/Footer";
import styles from "../styles/pages/detail.module.css";
import MarkNav from "markdown-navbar";
import "markdown-navbar/dist/navbar.css";
import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";
// import Tocify from "@/components/tocify.tsx";
import BlogBar from "../components/BlogBar"; //导航栏
import servicePath from "config/apiUrl";

const Header = React.lazy(() => import("@/components/Header"));
const Author = React.lazy(() => import("@/components/Author"));
const Footer = React.lazy(() => import("@/components/Footer"));
const Icon = React.lazy(() => import("@/components/Icon"));

// nextjs获取数据是写在外部函数里的，所以如果要实现获取数据时，修改组件状态就很烦(不过也很正常，因为是预渲染，获取到数据后，不会再重新渲染了)
// nextjs当前使用的是预渲染,即先给页面,再请求数据的,从network可以看出其实并不是直接返回页面
const Detail = ({ data }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [anchor, setAnchor] = useState([]);
  const [html, setHtml] = useState("");
  const { articleContent, addTime, title, typeName, viewCount } = data;
  // text:目录标题,level:标题的层次,返回anchor:锚点格式为toc11,toc21这种
  // renderer.heading = function (text, level, raw) {
  //   const anchor = tocify.add(text, level);
  //   return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  // };
  useEffect(() => {
    const renderer = new marked.Renderer();
    let anchorItems = [];
    let index = 5;
    const add = (text, level) => {
      const getItem = (anchor, text) => {
        return { key: "#" + anchor, title: text, href: "#" + anchor };
      };
      //标签过小不予展示,toc26表示这是第二级的标签，6用于唯一化
      if (level <= 4) {
        const anchor = `toc${level}${++index}`;
        anchorItems.push(getItem(anchor, text));
        return anchor;
      } else return null;
    };
    // renderer.heading,根据新规则，重新渲染标题，它会每个标题都调用一下的
    // renderer函数的调用是不显示的,所以不能在里面写set，会崩溃,我是希望一种类似于计算属性的来给定anchor
    renderer.heading = function (text, level, raw) {
      const anchor = add(text, level);
      // 返回链接，点击就可以跳转锚点
      let s1 = `
      <a id='${anchor}' href="#${anchor}" class=${styles.title_anchor}>
      <h${level}>${text}</h${level}>
      </a>`;
      if (level === 1) s1 += "\n";
      else s1 += "<hr/>\n";
      return s1;
    };
    marked.setOptions({
      renderer: renderer,
      gfm: true, //启动类似Github样式的Markdown,填写true或者false
      pedantic: false, //只解析符合Markdown定义的，不修正Markdown的错误。填写true或者false
      sanitize: false, //原始输出，忽略HTML标签，这个作为一个开发人员，一定要写flase
      tables: true, //支持Github形式的表格，必须打开gfm选项
      breaks: true, //支持Github换行符，必须打开gfm选项，填写true或者false
      smartLists: true, //优化列表输出，这个填写ture之后，你的样式会好看很多，所以建议设置成ture
      smartypants: true,
      highlight: function (code) {
        // code就是markdown解析出来的代码,然后给highlight渲染
        // const preCode = hljs.highlightAuto(code).value;
        // // // 以换行进行分割
        // const lines = preCode.split(/\n/).slice(0, -1);
        // // // 添加自定义行号
        // let html = lines
        //   .map((item, index) => {
        //     return (
        //       '<li><span class="line-num" data-line="' +
        //       (index + 1) +
        //       '">' +
        //       item +
        //       "</span>"
        //     );
        //   })
        //   .join("");
        // console.log(html);
        // return html;
        // 添加代码语言
        // if (lines.length) {
        //   html += '<b class="name">' + lang + "</b>";
        // }
        return hljs.highlightAuto(code).value;
      },
    });
    // 这里用marked来写,尽量把数据都放到状态里统一管理
    setHtml(marked(articleContent));
    setAnchor(anchorItems);
    // 初次渲染时调用即可
    setIsLoading(false);
    document.title = "博客详情页 | 时间序列小杰的个人博客";
  }, []);
  return (
    <div style={{ position: "relative" }}>
      <Suspense>
        <div className="bkg_image"></div>
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
            <Spin tip="加载中..." spinning={isLoading}>
              <div>
                <div className={styles.bread_div}>
                  <Breadcrumb>
                    <Breadcrumb.Item>
                      <Link href="/">首页</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                      <Link href="/">{typeName}</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>{title}</Breadcrumb.Item>
                  </Breadcrumb>
                </div>
              </div>
              <div>
                <div className={styles.detailed_title}>{title}</div>
                <div className={`${styles.list_icon} ${styles.center}`}>
                  <Space>
                    <span>
                      <Space size="small">
                        <Icon icon="calendar" />
                        {addTime.slice(0, 10)}
                      </Space>
                    </span>
                    <span>
                      <Space size="small">
                        <Icon icon="folder" />
                        {typeName}
                      </Space>
                    </span>
                    <span>
                      <Space size="small">
                        <Icon icon="fire" />
                        {viewCount}
                      </Space>
                    </span>
                  </Space>
                </div>
                {/* 内容部分 */}
                <div
                  className={styles.detailed_content}
                  dangerouslySetInnerHTML={{ __html: html }}
                >
                  {/* 这里用的是children */}
                  {/* <ReactMarkdown children={markdown} escapeHtml={false} /> */}
                </div>
              </div>
            </Spin>
          </Col>
          <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
            <Author />
            {/* <Advert /> */}
            {/* Affix:固定,可以比它大，但不可以比它小 */}
            <Affix offsetTop={50}>
              <div className={`${styles.detailed_nav} comm-box`}>
                <div className={styles.nav_title}>文章目录</div>
                <BlogBar anchor={anchor} className={styles.blogBar} />
              </div>
            </Affix>
          </Col>
        </Row>
        <Footer />
      </Suspense>
    </div>
  );
};

// 在同一个文件下写这个函数，就可以获取数据
// 涉及到动态路由，就用这个函数来获取路由参数
export async function getServerSideProps(ctx) {
  let id = ctx.query.id;
  const res = await fetch(`${servicePath.getArticleById}?id=${id}`);
  const data = await res.json();
  // console.log(data.data[0].article_content);
  // data是一个对象，data.data才是需要的东西
  // data.data是一个数组，数组里面是对象
  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    // 默认先取人数为666，阅读人数功能后面做
    props: {
      data: {
        addTime: data.data[0].addTime,
        articleContent: data.data[0].article_content,
        title: data.data[0].title,
        typeName: data.data[0].typeName,
        viewCount: 666,
      },
    }, // will be passed to the page component as props
  };
}
export default Detail;
