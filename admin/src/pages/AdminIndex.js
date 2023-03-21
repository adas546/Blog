// 布局组件
// 这里采取antd的侧边布局(可以去antd看效果选择的)
// useState就理解为能够重新render(加入render队列)
import {
  FileOutlined,
  PieChartOutlined,
  UserOutlined,
  DesktopOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
// 首页会加载增加文章组件,本js是布局，具体页面在AddArtcle中显示
import AddArticle from "./AddArticle";
import ArticleList from "./ArticleList";
const { Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
// 它用item保存了后台展示的数据导航了，这个getItem函数还是可以的
const items = [
  getItem("工作台", "1", <PieChartOutlined />),
  // getItem("文章管理", "2", <DesktopOutlined />),
  getItem("文章管理", "sub1", <UserOutlined />, [
    getItem("添加文章", "addArticle"),
    getItem("文章列表", "articleList"),
  ]),
  getItem("留言管理", "5", <FileOutlined />),
];
const AdminIndex = () => {
  const navigate = useNavigate();
  // 控制是否合上的效果
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  // 根据key值确定路由
  const handleClickArticle = (e) => {
    if (e.key === "articleList") {
      navigate("/index/list");
    } else {
      navigate("/index/add");
    }
  };
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      {/* collapsed和onCollapse都是Sider提供的属性 */}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            height: 32,
            margin: 16,
            background: "rgba(255, 255, 255, 0.2)",
          }}
        />
        <Menu
          theme="dark"
          onClick={handleClickArticle}
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          {/* 面包屑小导航 */}
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            {/* 后面这需要动态显示 */}
            <Breadcrumb.Item>后台管理系统</Breadcrumb.Item>
            <Breadcrumb.Item>工作台</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <Routes>
              {/* 这里的路由匹配就是从/index后开始的了,第一级路由不能写exact，否则无法做多级路由匹配了 */}
              {/* 默认展示添加文章页面 */}
              <Route path="/" exact element={<AddArticle />} />
              {/* 新版多级路由不用带上之前的路由 */}
              <Route path="/add/" exact element={<AddArticle />} />
              <Route path="/list" exact element={<ArticleList />} />
              {/* 注释掉然后页面不显示，说明走的这个路径.走这个路径，说明是修改文章 */}
              <Route path="/add/:id" exact element={<AddArticle />} />
            </Routes>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
            fontSize: 10,
          }}
        >
          <a href="http://www.sjxlxj.cn">sjxlxj.cn</a>
        </Footer>
      </Layout>
    </Layout>
  );
};
export default AdminIndex;
