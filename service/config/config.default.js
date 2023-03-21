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
      password: "123456",
      // database,注意识别空格，react_blog后面如果打了空格就会报错
      database: "react_blog",
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  };

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
  // 最后返回时解构，所以要把exports.mysql改成config.mysql
  return {
    ...config,
    ...userConfig,
  };
};
