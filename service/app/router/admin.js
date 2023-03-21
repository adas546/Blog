// 后台的路由配置文件
// 前台路由配置文件
("use strict");
module.exports = (app) => {
  const { router, controller } = app; //从app里解构出来
  // 从这就可以看出来，middleware必须放app里
  var adminauth = app.middleware.adminauth();
  // 地址是自己写的
  router.get("/admin/index", controller.admin.main.index);
  // 用post处理会更安全些
  router.post("/admin/checkLogin", controller.admin.main.checkLogin);
  // 用中间件来守卫路由,表示不登陆访问这个接口是无效的
  router.get(
    "/admin/getTypeInfo",
    adminauth, //放在第二个参数里，就可以实现路由守卫功能(没有登录的话，接口就是无效的)
    controller.admin.main.getTypeInfo
  );
  // 这里也加一个路由守卫
  router.post("/admin/addArticle", adminauth, controller.admin.main.addArticle);
  router.post(
    "/admin/updateArticle",
    adminauth,
    controller.admin.main.updateArticle
  );
  //获取文章列表用get形式即可
  router.get(
    "/admin/getArticleList",
    adminauth,
    controller.admin.main.getArticleList
  );
  router.get(
    "/admin/delArticle/:id",
    adminauth,
    controller.admin.main.deleteArticle
  );
  router.get(
    "/admin/getArticleById/:id",
    adminauth,
    controller.admin.main.getArticleById
  );
};
