// 前台路由配置文件
"use strict";
module.exports = (app) => {
  const { router, controller } = app; //从app里解构出来
  // 地址是自己写的
  router.get("/default/index", controller.default.home.index);
  router.get("/default/getArticleList", controller.default.home.getArticleList);
  router.get("/default/getArticleById", controller.default.home.getArticleById);
  router.get("/default/getTypeInfo", controller.default.home.getTypeInfo);
  router.get("/default/getListByTypeId", controller.default.home.getListByTypeId);
};
