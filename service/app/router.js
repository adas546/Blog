"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
// app下另外常用的文件夹,view:模板文件夹.extend:扩展方法，middleware:中间件
module.exports = (app) => {
  // const { router, controller } = app;
  // router.get("/", controller.home.index);
  // 到js这一层即可
  require("./router/default")(app);
  require("./router/admin")(app);
};
