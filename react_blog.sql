/*
 Navicat Premium Data Transfer

 Source Server         : houtai
 Source Server Type    : MySQL
 Source Server Version : 80032
 Source Host           : localhost:3306
 Source Schema         : react_blog

 Target Server Type    : MySQL
 Target Server Version : 80032
 File Encoding         : 65001

 Date: 20/03/2023 00:34:22
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin_user
-- ----------------------------
DROP TABLE IF EXISTS `admin_user`;
CREATE TABLE `admin_user`  (
  `id` int NOT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admin_user
-- ----------------------------
INSERT INTO `admin_user` VALUES (1, 'lh', '123456');

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `type_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `title` tinytext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `article_content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `introduce` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `addTime` int NULL DEFAULT NULL,
  `view_count` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES (1, '4', 'Nodejs学习-1', '# Nodejs初识\n\n- 不同的浏览器使用了不同的JS解析引擎：\n  - chrome浏览器，v8\n  - FireFox浏览器，odmnMonkey\n  - Sari浏览器，JSCore\n  - V8性能最好\n- 浏览器存在有DOM API，BOM API，AJAX API，JS代码通过JS解析引擎，操作这些api。\n- Node.js 在浏览器之外运行 V8 JavaScript 引擎，在node中解析js做的就是后端的开发 \n- 浏览器是js的前端运行环境，Nodejs是js的后端运行环境\n- Nodejs无法调用DOM，BOM等**浏览器内置API**。', 'assdasdasdasdas', 123436800, 465789);
INSERT INTO `article` VALUES (2, '1', 'nextjs学习教程(一）', '# 服务端渲染和SPA\n\n- SPA: single page web application(react和vue都是单一页面)\n  - 由于所有资源都在一个页面上，就会出现首屏加载过慢，不能SEO(搜索引擎优化，现在貌似可以了，但总的来说还是不方便)\n- next.js: 在**服务端进行渲染**(SSR)\n  -  HTML 是在 **每个页面请求** 时生成的\n  -  如果 page（页面）使用的是 **服务器端渲染**，则会在 **每次页面请求时** **重新生成**页面的 HTML 。致性能比“静态生成”慢\n  -  搭建起来非常轻松\n  -  自带数据同步(即服务端进行渲染，把页面交给客户端，在客户端进行操作时，服务端和客户端要同步)\n  -  丰富的插件，自己形成了生态\n  -  灵活的配置\n  -  搭建next.js，可以自己配，也可以用create-next-app来配置\n\n# 手动配置next.js\n\n## 下载依赖包\n\n- npm init(全部enter过去)\n\n- vscode打开文件夹和终端\n\n- npm i react react-dom(网页应用) next\n\n- 配置命令，即修改package.json文件\n ```json\n    // 添加简易命令 \n    \"scripts\": {\n        \"test\": \"echo \\\"Error: no test specified\\\" && exit 1\",\n        \"dev\":\"next\",\n        \"build\":\"next build\",\n        \"start\": \"next start\"\n      },\n```\n\n## 编写Hello页面\n```javascript\n// 用了next.js就不用引入react那些东西了，都自动帮你引入了\n// pages文件夹里的东西，next.js都会自动帮你绑定依赖\nfunction Index() {\n  return <div>Hello Next.js</div>;\n}\n\nexport default Index;\n```\n- npm run dev，即可运行项目', '介绍了服务端渲染和SPA的区别，nextjs的配置与基本使用', 1678982400, NULL);
INSERT INTO `article` VALUES (3, '1', 'nextjs学习教程(二）', '# 创建项目与构建组件\n## create-next-app 创建项目\n- npm i create-next-app\n- npx create-next-app next-create(项目名称)\n\n- 新版没有component文件夹了，但可以自己写\n- .gitignore:控制什么东西不用git上传什么不用\n\n\n## pages组件\n\n- next无需配置路由匹配，只需把页面编写到pages文件夹下，会自动帮你配置好路由匹配(路由跳转还是需要自己写的，并且组件要默认暴露出去)\n- index.js:首页文件(默认打开页面)，其它都可以删掉，保留这个文件即可\n\n- lh.js：自己编写的页面文件，无需导入react直接写\n\n- ```javascript\n  export default function Lh() {\n    return <button>哈哈哈123456</button>;\n  }\n  ```\n\n- 访问页面用http://localhost:3000/lh即可访问到(lh.js，所以就是lh)\n\n- 多级路由可以建立文件夹，如上图所示，通过http://localhost:3000/blog/nextBlog就可以访问到该页面\n\n## components组件\n\n- 即一般组件，如果要传递信息，在pages文件夹里的index.js中写入\n\n- 这里使用的是简单的父子组件传递信息\n\n- ```javascript\n  import Jslh from \"@/components/jslh\";\n  // 通过children属性传递对象\n  <Jslh>按钮组件</Jslh>\n  ```\n\n- Jslh.js文件中写入\n\n- ```javascript\n  // 输入参数部分{children}是解构的意思，解构出children属性\n  export default ({ children }) => <button>{children}</button>;\n  ```', '介绍了nextjs的创建，并讲解了pages组件和components组件', 1678982400, NULL);
INSERT INTO `article` VALUES (4, '1', 'nextjs学习教程(三）', '# 路由的编程式跳转和标签跳转\n\n## 标签跳转\n\n```jsx\nimport Link from \"next/link\";\n<div>\n  <Link href=\"/JspangB\">去JSPAngB页面</Link>\n</div>\n```\n\n- 要理解意思，这个意思表示点击去JSPAngA页面这个链接，会修改路由为localhost/jspangA，所以实现跳转\n\n- 根据路由渲染页面是另外的东西(next底层已经实现了)\n\n## 编程式跳转\n\n```javascript\n// Router是跳转路由，根据路由渲染页面是另外的东西(next底层已经实现了)\nimport Router from \"next/router\";\n<div>\n  {/* 实际业务中，一般onClick中的函数都单独写出来，实现复用 */}\n  <button\n    onClick={() => {\n      Router.push(\"/JspangA\");\n    }}\n  >\n    JspangA\n  </button>\n</div>\n```\n\n# 传递和接收参数\n\n- 在 Next.js 中只能通过 query（?name=jackylin）来传递参数，不能通过(path:name)的形式传递参数。\n\n- 5是静态跳转，实际都是动态跳转，即携带参数跳转到另一个页面\n\n- ```javascript\n  import Router from \"next/router\";\n  function gotoef() {\n  // query参数\n  // Router.push(\'/xj?name=\"cd\"\');\n      Router.push({\n        pathname: \"/xj\",\n        query: { name: \"ef\" },\n      });\n  }\n  <div>\n  	<button onClick={gotoef}>选ef</button>\n  </div>\n  ```\n\n- ```javascript\n  // 新属性，使用withRouter,使得函数式组件也可以接收参数\n  // withRouter是高阶组件，包裹子组件并给子组件传递参数，比如这里的router\n  import { withRouter } from \"next/router\";\n  import Link from \"next/link\";\n  // 这里也是小写，因为没有大写Router可以解构出来\n  const xj = ({ router }) => {\n    return (\n      <>\n        <div>{router.query.name}</div>\n        <Link href=\"/\">返回首页</Link>\n      </>\n    );\n  };\n  \n  export default withRouter(xj);\n  ```\n\n## 直接获取数据库数据\n\n```javascript\n// 输入参数为props\nconst Home = ({ data }) => {} ;\n// 写在同一个文件下暴露出去，就会在生成组件时，先跑这个函数(必须要有返回值,为对象且参数为props)\n// 组件内通过{data}，就可以解构出\n\n// 想看传入的数据，console.log得写在getStaticProps里\nexport async function getStaticProps(context) {\n  const res = await fetch(`http://localhost:7001/default/getArticleList`);\n  const data = await res.json();\n  // data是一个对象，data.data才是需要的东西\n  if (!data) {\n    return {\n      notFound: true,\n    };\n  }\n\n  return {\n    props: { data }, // will be passed to the page component as props\n    // props: { data: data.data[0].article_content }\n  };\n}\nexport default Home;\n```\n\n## 通过url定向获取数据\n\n```javascript\nconst Detail = ({ data }) => {\n    return(\n        // 这样就可以在浏览器上查看具体的data数据了\n        <div>{console.log(data.data)}</div>\n    )\n} ;\n// 在同一个文件下写这个函数，就可以获取数据\n// 涉及到动态路由，就用这个函数来获取路由参数\nexport async function getServerSideProps(ctx) {\n  let id = ctx.query.id; //只有getServerSideProps的ctx有query获取参数\n  const res = await fetch(\n    `http://localhost:7001/default/getArticleById?id=${id}`\n  );\n  const data = await res.json();\n  // console.log(data);\n  // data是一个对象，data.data才是需要的东西\n  if (!data) {\n    return {\n      notFound: true,\n    };\n  }\n\n  return {\n    props: { data }, // will be passed to the page component as props\n  };\n}\nexport default Detail;\n```\n\n', '介绍了路由的编程式跳转和标签跳转，以及参数的两种获取方式', 1678982400, NULL);
INSERT INTO `article` VALUES (5, '1', 'nextjs学习教程(四）', '# 6个hook钩子事件(这个是路由钩子事件)\n\n## 事件种类\n\n- routeChangeStart\n  - 路由发生变化之前\n- routeChangeComplete\n  - 路由变化结束\n- beforeHistoryChange\n- routeChangeError\n  - 注意404不算错误\n- hashChangeStart\n  - hash路由切换开始\n- hashChangeComplete\n  - hash路由切换完成\n\n## 使用方法\n\n```javascript\n  Router.events.on(\"routeChangeStart\", (...args) => {\n    console.log(\"1.routeChangeStart,参数为:\", ...args);\n  });\n```\n\n- 注意上面最好写道useEffect函数中，模拟生命周期，避免反复调用，占用过多资源', 'nextjs定义的六个路由钩子事件', 1678982400, NULL);
INSERT INTO `article` VALUES (6, '1', 'nextjs学习教程(五）', '## 使用axios获取远端数据\n\n- npm i axios\n- 具体内容可以看axios学习文档\n\n## style JSX编写css样式\n\n- nextjs不允许直接在js模块中导入css，只能导入module.css，或者在全局导入css\n\n## 懒加载（模块的优化）\n\n- moment:格式化时间\n- 评价为不如看react后面补充的\n\n## AntDesignUI的使用\n\n直接抄文档即可，现用现查\n\n## 补充\n\n- easy-mock:模拟数据产生的一个平台', 'nextjs定义的其它相关知识', 1678982400, NULL);
INSERT INTO `article` VALUES (7, '1', 'nodejs学习2', '测试使用', '测试使用', 1679155200, NULL);
INSERT INTO `article` VALUES (9, '4', 'nodejs学习3', '测试使用', '测试使用', 1679155200, NULL);

-- ----------------------------
-- Table structure for type
-- ----------------------------
DROP TABLE IF EXISTS `type`;
CREATE TABLE `type`  (
  `id` int NOT NULL,
  `typeName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `orderNum` int NULL DEFAULT NULL,
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of type
-- ----------------------------
INSERT INTO `type` VALUES (1, '视频教程', 4, 'youtube');
INSERT INTO `type` VALUES (2, 'leetcode刷题', 3, 'rise');
INSERT INTO `type` VALUES (3, '项目讲解', 2, 'copy');
INSERT INTO `type` VALUES (4, '学习教程', 1, 'edit');

SET FOREIGN_KEY_CHECKS = 1;
