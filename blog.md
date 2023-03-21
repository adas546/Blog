# 快捷键设置

- ctrl+->，跳到单词后

# 前台开发环境的搭建

- npm i @zeit/next-css（13 版本已经默认支持 css 样式了，因此可以跳过这一步了)
- npm i antd，下载 antd 库
- npm i babel-plugin-import，下载插件，从而按需引入 antd 的组件样式(现在 antd 已经默认支持按需加载了，不需要这个了)

## markdown 的 nav 模块

npm i markdown - navbar

import MarkNav from "markdown-navbar";

import "markdown-navbar/dist/navbar.css";

基本使用

```javascript
{
  /* Affix:固定 */
}
<Affix offsetTop={5}>
  <div className={`${styles.detailed_nav} comm-box`}>
    <div className={styles.nav_title}>文章目录</div>
    // 这里就是MarkNav的使用方法
    <MarkNav
      className={styles.marknav}
      source={markdown}
      // ordered:有无编号
      ordered={false}
      headingTopOffset={80}
    />
  </div>
</Affix>;
```

# 中台环境的搭建

- 采用 egg.js 搭建，整体结构为(先用 egg.js，后面再改用 nest.js 吧)

![Bolg的三个结构](http://newimg.jspang.com/blog_demo01.jpg)

- 底层是 koa

## 安装 egg.js 开发环境

- npm i egg-init -g
- 在 blog 文件夹外，再建立一个文件夹 service(区分开前端)
- cd 进去，然后 egg-init --type=simple，一直按确认
- npm install，根据 package.json 文件安装依赖包

## RESTFUL 接口和路由配置

- RESTful 是一种多用于接口的设计风格，先如今常用的前后端分离就用到了
- 简单而且有约束性(从请求方式上进行约束)
- 请求方式：get(从服务端获取数据) post(服务端新建资源 add) put(更新资源) delete(删除资源)
- controller 下建立两个文件夹(习惯命名法)
  - admin: 后台的接口
  - default: 前台的接口

### 接口书写

先写前台的接口，在前面建立的文件夹中写

```javascript
"use strict";

const { Controller } = require("egg");

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = "api接口";
  }
}
// 注意暴露出去
module.exports = HomeController;
```

### 路由配置

- app 下建立文件夹 router，专门负责配置前台和后台的路由
- 前台路由 default.js，后台路由 admin.js

```javascript
"use strict";
module.exports = (app) => {
  const { router, controller } = app; //从app里解构出来
  router.get("/default/index", controller.default.home.index);
};
```

- 路由总文件 home.js 配置为，用 require 高阶函数的形式，把配置好的路由引入

```javascript
"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
// app下另外常用的文件夹,view:模板文件夹.extend:扩展方法，middleware:中间件
module.exports = (app) => {
  require("./router/default")(app);
};
```

## egg.js 连接 mysql 数据库

- 安装插件 npm i egg-mysql

- 修改插件配置/service/config/plugin.js 为

- ```javascript
  module.exports = {
    had enabled by egg
    static: {
    enable: true,
    },
    mysql: {
      enable: true,
      package: "egg-mysql",
    },
  };
  ```

- 修改 config 配置(/service/config/config.default.js)为

- 配置修改方法，可以搜www.npmjs.com，然后输入egg-mysql，再到里面看，就可以发现会教怎么配置plugin和config

- ```javascript
  /* eslint valid-jsdoc: "off" */
  
  "use strict";
  
  /**
   * @param {Egg.EggAppInfo} appInfo app info
   */
  module.exports = (appInfo) => {
    /**
     * built-in config
     * @type {Egg.EggAppConfig}
     **/
    const config = (exports = {});
  
    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + "_1676255505909_1869";
  
    // add your middleware config here
    config.middleware = [];
  
    // add your user config here
    const userConfig = {
      // myAppName: 'egg',
    };
  
    config.mysql = {
      // database configuration
      client: {
        // host，有服务器可以改成服务器地址
        host: "localhost",
        // port
        port: "3306",
        // username
        user: "root",
        // password
        password: "12345678",
        // database，注意不能有空格，空格也会识别
        database: "react_blog",
      },
      // load into app, default is open
      app: true,
      // load into agent, default is close
      agent: false,
    };
  
    // 最后返回时解构，所以要把exports.mysql改成config.mysql
    return {
      ...config,
      ...userConfig,
    };
  };
  ```

- 安装 phpstudy，轻松创建 mysql 环境
- 在软件里面安装插件 SQL_Font5.3，点击管理，管理 mysql 数据库
- 进入之后，输入 root 和密码，然后新建数据库 react_blog，并创建字段(注意只有点左侧 react_blog 中的子项才能同时看到字段，类似于 excel 中的列名)
- 构建好字段后，就可以在数据浏览器中写入东西了，写好之后点击发布即可
- **console.log()会在终端显示**，而不是在控制台(不知道为什么)

# 前中台结合

- 即前台读取中台的接口(采用 axios 方法)，在前台(blog)下安装 axios(blogs 下的 package.json 文件可以看版本)
- 要 npm run dev 中台，就必须要把 mysql 先打开(如果 phpstudy 上打不开，就取此电脑/管理/服务/mysql 下，看服务开没开，开了就关。phpstudy 内部集成了 mysql 环境，但外部不显示，服务里面显示的是 phpstudy 服务)
- 为啥数据库不打开，就会报错捏?

# 重构前台博客详细页面(即 markdown 修改为 marked+highlight.js)

- react-markdown，代码高亮太难做了，所以重构下 markdown 页面，改用技术为 marked+highlight.js

## 配置环境

- npm i marked npm i highlight.js
- 删掉 package.json 的 dependencies 中的 react-markdown 依赖

## 配置 header(根据后台数据库文章的种类来配置)

- 注意，想跳转到目录页(index.js)，需要的是/，而不是/index

- ```javascript
  // 利用useState和useEffect使用钩子，后者理解为生命周期
  // 当然使用原生函数getStaticProps和getServerSideProps也是可以的,但用了这个，就不要用钩子了，画蛇添足
  // 函数式组件默认传入参数就是props
  const Header = () => {
    const [navArray, setNavArray] = useState([]);
      // 写在第一个参数里面，就相当于组件挂载前执行
    useEffect(() => {
      const fetchData = async () => {
        // 两个都要有await，否则会报错，因为是串联操作
        const result = await fetch(servicePath.getTypeInfo);
        const data = await result.json();
        //
        setNavArray(data.data);
      };
      fetchData();
    }, []);
  ```

# 博客后台搭建

- 采用 create-react-app 作单页应用(spa)即可，不需要服务端渲染
- 要在 react-blog 文件夹下使用命令，因为会**自动创建文件夹**的
- create-react-app 是要用 npm start 打开的，无法用 npm run dev 打开
- 安装 antd 组件库(注意文件安装目录，npm i antd,默认应该是全局安装?)

## 页面路由配置

- npm i react-router-dom

## 中台登录接口编写

### cookie,session,token

- http**本身是没有状态的**，每次链接都是一次全新的链接。保存登录状态的方法有好几种，但核心理念就是存储。也即把用户名和密码放到数据库中(实操中后台不保存密码，而是保存盐化值哈希值)，每次请求做对比，对比成功返回相应的页面。常见办法如浏览器保存账号密码，就不用我们自己输入了

- cookie 就是实现每次 HTTP 请求都自动带数据给服务器的技术(保存到客户端)

  - 浏览器发起 http 请求，服务器会进行 cookie 设置(Set-Cookie)，有两个重要属性(Name,Value)以及作用域(Domain)和失效时间(age)
  - 以后每次发 http 请求(每个网页的 cookie 不相同的，每个网页都是一个 http 请求)，都会带上这个 cookie
  - 本质上，cookie 就是存储在浏览器的数据而已
  - cookie 可以通过(application->storage->cookies 查看)，因此把用户名和密码放在 Cookie 是很不安全的

- Session(会话，保存到服务端)

  - 首次登录网站，传入账号和密码，会返回一个 session，如

    - ```javascript
      Session{
          cookie:{
              path:'/'
              _expires:
              originalMaxAge:15000, //后端指定
              httpOnly:true
          }
          username:''
      }
      // 当前唯一对话的ID，藏在cookie里的value
      ```

  - 把这些 set-Cookie，然后每次访问都会发送这个 cookie，从中获取 session id 从而对话，知道 cookie 的有效期失效以后，浏览器一般就会自行删除这个 cookie(session 里会设置 cookie 的有效期)

  - 点击登出，后端也会自动删除 cookie

  - 这样账号密码就是存储在服务端的了，客户端只有 session id，并且通常浏览器还会对 session-id 进行签名

  - session-id 不是根据用户名和密码生成的，可以根据任何规则生成

- 当大量访问服务器时，就会出现服务器需要保存多个 session 以致超载的情况，这时候即使把 sessionid 存到数据库，也可能会超载。因此就出现了 jwt 技术(JSON Web Token)。校验形式和 session 类似，区别在于它只保存 jwt 签名的报文，不保存整个 session(本质在于，服务器没有为每一个用户存储 token，只是**存储了一个加密密文**)

- jwt 由三部分组成，(header.payload.signature)，header 声明**用什么算法来签名**，payload:特定数据，如有效期之类的

- 接着 header 和 payload 会经由 Base64 编码成一段字符串。Jwt 不保存在服务器这里，服务器这里会保存一个密钥，服务器密码结合两端编码一起运算(header 声明的算法)，就会得到签名信息

- Token：Token 是**服务端生成的一串字符串，以作客户端进行请求的一个令牌**,保存在 localstorage 里

### cookie 和 localStorage

- cookie: 当客户端要发送 http 请求时，浏览器会先检查下是否有对应的 cookie。有的话，则**自动**地添加在**request header**中的 cookie 字段。注意，每一次的 http 请求时，如果有 cookie，浏览器都会**自动**带上 cookie 发送给服务端。

- localStorage: 没看懂为啥要存这个?

- 本博客中，其实只是做了一个 login 跳转到 index 页面的东西，但如果路由直接输入 index 也是可以进去的，所以得限制下，没有 login 就不能跳转 index 页面，即路由守卫(这个可以用路由守卫做，具体思路就是如果 login 成功，就修改 session 上的属性(**要注意跳转也是走这个 session 的**)，如果 session 上的属性正确，就说明 login 成功，即可以跳转)

- 所以**成功登录一次**后，就可以**通过路由走了**。阻止方法要么客户端清除 cookie，或者服务端清除 session

- 要注意 cookie 是针对网站的，通常由服务器对任意 Http 请求发送 Set-Cookie Http 头作为响应的一部分，其中包含会话信息。

- ```
  Set-Cookie:name=test; Path=/; Domain=xx.com; Max-Age=2592000; HttpOnly; Secure; SameSite=None
  ```

  - **名称**：一个唯一确定的 Cookie 名称，不区分大小写，需要经过 URL 编码。(常见如 csrfToken，EGG_SESS：**存着用户的信息**。 每次请求会验证用户 seesion id 对应用户信息)
  - **值**：存在在 cookie 中的字符串值，需经过 URL 编码。
  - **域（Domain）**：配置 cookie 对哪个域有效。所有向该域发送的请求都会带上 cookie 信息，可以包含子域也可以不包含。没有设定，默认来自设置 cookie 的那个域。
  - **路径(Path)**：对于指定域中的那个路径，应该向服务器发送 cookie。
  - **失效时间**：表示 cookie 何时被删除的时间（停止向服务器发送 cookie 的时间）。默认情况下，浏览器会话结束时即删除所有 cookie 数据，不过也可以设置删除时间。配置删除时间后，cookie 可在浏览器关闭后仍然保存在用户机器上，前提是设置的时间是未过期时间。配置方式，Expires 属性指定的日期或在 Max-Age 属性指定的一段时间后删除。
  - **安全标志(Secure)**：指定后，cookie 只有在使用 SSL 连接的时候才发送服务器。
  - **HttoOnly**：JavaScript Document.cookie API 无法访问具有 HttpOnly 属性的 cookie。它仅发送到服务器。例如，持久化服务器端会话的 cookie 不需要对 JavaScript 可用，并且应该具有 HttpOnly 属性。此预防措施有助于缓解跨站点脚本（XSS）攻击
  - **URL 编码**：encodeURIComponent（编码）/decodeURIComponent（解码）

- `Cookie`和`localStorage`均受到同源策略的保护

- 要做到同一个 session，就需要允许 cookie 跨域

- 删除 cookie 直接打开 application 中的 cookies，就可以把想要的删除

### session 使用和理解

- 要注意 session 是服务端的东西，服务端接收到 http 请求后，会自动去翻查 cookie，如果找到对应的 key，就会去后端找到对应的 session，因此就可以做到多个 http 请求共用一个 session(可用于做路由守卫)

- 最关键的就是**cookie 要可以跨域**

- ```javascript
  config.security = {
    csrf: {
      // 它这关闭是enable?md之前都写enabled
      enable: false,
    },
    // 当您从客户端发出请求时，egg会返回一个Access-Control-Allow-Origin响应标头，其中包含您传入的域以及有效负载和状态代码200。
    // 域白名单
    domainWhiteList: ["*"],
  };
  config.cors = {
    // 允许哪些域名可以跨域访问
    origin: "*",
    credentials: true, //允许cookie跨域
    allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS",
  };
  ```

- ```javascript
  const getTypeInfo = (props) => {
    axios({
      method: "GET",
      url: servicePath.getTypeInfo,
      // 这是两次通讯，第一次来证明是否登录，第二次通过登录状态判断是否应该导出该路由
      // getItem获取，removeItem删除
      // data: localStorage.getItem("openId"),
      // 跨域cookie,允许cookie跨域，就能允许session共享了
      withCredentials: true,
    }).then((res) => {
      // 如果接口访问不通，就说明没有登录，返回原始界面
      // session存储在服务端，客户端时没有办法访问到session.id的
      // 原理就是，携带cookie后，访问的就是同一个session，所以通过session就可以判断是否成功login
      if (res.data.data === "没有登录") {
        localStorage.removeItem("openId");
        navigate("/"); //返回登录界面
      } else {
        setTypeInfo(res.data.data);
      }
    });
  };
  ```

- 服务端修改 session

- ```javascript
  if (res.length > 0) {
    let openId = new Date().getTime(); //直接用时间来作为openId
    // openId存到了这次通信的session上,session存储在服务端，首次访问时会新建，后面访问就会自动查找cookie有无对应key值，根据key值找到session
    // 因此是多个http请求共用一个session(只要都是同一台客户端访问同一台服务器就是这样的)
    this.ctx.session.openId = { openId: openId };
    // openId用于前后台的二次验证,防止多次访问数据库
    this.ctx.body = { data: "登录成功", openId: openId };
  } else {
    this.ctx.body = { data: "登录失败" };
  }
  ```

## localhost 和 127.0.0.1

不懂为啥，但有不同？

- **localhost 的数据包不经过网卡传输，不受防火墙限制** 127 的数据包经过网卡传输，受防火墙限制！

## 增加/修改文章

- 现在用的方法是当前页面的，算开了一个新列，一直修改当前文章
- 要想真正在数据库中添加记录，需要刷新后，重置 articleId 然后才可以在数据库中新增记录

# 云服务器部署

- 云服务器下载nodejs(傻逼教程，这么慢都不行)，运行make指令还会报错

- 使用的阿里云服务器，unbuntu版本为22.04.1，搭配的nodejs版本为18.12.0，阿里云自身的操作系统很垃圾，不要用

- https://help.aliyun.com/document_detail/172788.html?spm=a2c4g.11186623.0.0.6af54147iSzIOB，阿里云自身有提供指导，即如何部署web环境

- 安装mysql，使用的mysql版本为8.0.32

- mysql设置自动重启，使用的是3306端口

- ```shell
  开机自动重启: sudo update-rc.d -f mysql defaults
  查看mysql运行状态：sudo service mysql status
  运行mysql：sudo service mysql start
  结束mysql：sudo service mysql stop
  取消开机启动：sudo update-rc.d -f mysql remove
  重启： sudo service mysql restart
  ```

- mysql远程连接

- ```
  // 允许以root用户方式访问数据库
  // create user 'root'@'%' identified by 'PASSword123!';
  //grant all privileges on *.* to 'root'@'%'with grant option;
  // flush privileges;
  //修改 /etc/mysql/mysql.conf.d 下的mysqld.cnf，找到bind-address，把127.0.0.1 改为0.0.0.0，重启服务
  ```

- mysql -u root -p，进入root权限后，

- nginx下载的是1.18.0版本,CREATE DATABASE react_blog，创建数据库(用navicat也可以)

## 项目部署到服务器上

- 对于中台服务，把除了node_module的全放上去，然后npm intsall --production（可能会报有高危漏洞，按照提示来即可）
- 对于前台服务，把除了node_module的全放上去，然后npm intsall --production，然后npm.build，会生成一个.next文件夹(只有这个文件夹，也是跑不通的，它的机制很古怪，都需要，然后npm run start就会运行打包后的代码)
- 设置完前中台后，就可以设置nginx了。下载配置好nginx后，就可以访问到了

## 前台/中台/后台的开启和停止

- 前台: next build+ next start（错误就删掉.next文件夹再运行，注意一定要到前台文件夹再用这个指令)（npm run start 在远程窗口关掉后就没了的）

- 前台更新要记得删掉.next文件再更新

- 此外注意，从公开向私密域名访问，也是会被跨域的。（反之从私密到公开则不会)

- 前台调试成功之后，就可以下载pm2程序，要注意它是用npm下载的淦。sudo npm install -g pm2。但还要配一个软连接才行

- ```shell
  ln -s /root/lh/blog/blog/node_modules/pm2/bin/pm2 /usr/local/bin
  
  pm2 -V //验证是否安装成功
  ```

## pm2的使用

- 到目录下，pm2 start -n blog npm -- run start,表示允许npm run start

- ```shell
  $ pm2 restart app_name
  $ pm2 reload app_name
  $ pm2 stop app_name
  $ pm2 delete app_name
  ```

- pm ls: 所有进程状态

# 补充

## vscode 打开新文件，覆盖旧文件

打开首选项/设置/enablePreview/点击第二个(workbench)，然后取消钩即可

## antd 的 24 栅格法

- antd 的栅格本质上采取 flex 布局
- 通过 `row` 在水平方向建立一组 `column`（简写 col）。
- 你的内容应当放置于 `col` 内，并且，只有 `col` 可以作为 `row` 的直接元素。
- 栅格系统中的列是指 1 到 24 的值来表示其跨越的范围。例如，三个等宽的列可以使用 `<Col span={8} />` 来创建。
- 如果一个 `row` 中的 `col` 总和超过 24，那么多余的 `col` 会作为一个整体另起一行排列。
- 允许子元素在父节点内的水平对齐方式 - 居左、居中、居右、等宽排列、分散排列。子元素与子元素之间，支持顶部对齐、垂直居中对齐、底部对齐的方式。同时，支持使用 order 来定义元素的排列顺序。
- xs: `<576px`响应式栅格。
- sm：`≥576px`响应式栅格.
- md: `≥768px`响应式栅格.
- lg: `≥992px`响应式栅格.
- xl: `≥1200px`响应式栅格.
- xxl: `≥1600px`响应式栅格.

## qq 截取颜色

**ctrl+alt+a**：截屏，同时也可以截取颜色

## console.log 的输出

不是在终端，就是在 f12，两边同时开就能找到了

## Import in body of module; reorder to top import/first

import 必须在其它所有业务代码前面（[eslint](https://so.csdn.net/so/search?q=eslint&spm=1001.2101.3001.7020) 暴出），即 const = 不能在 import 前面

## ERR_CONNECTION_REFUSED

常见原因:

- 可能是服务器 iptables（防火墙）挡住了
- 可能是 ip 或者端口错了
- 服务端程序没启动

## 数据库新增数据无法显示

关闭管理软件后重开即可看到

