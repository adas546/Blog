// 存放后台所有的中台接口,这里要改为localhost而不是127.0.0.1,不知道为啥
let ipUrl = "http://localhost:7001/admin/";

let servicePath = {
  checkLogin: ipUrl + "checkLogin", //检测用户名和密码
  getTypeInfo: ipUrl + "getTypeInfo", //获得文章类别信息
  addArticle: ipUrl + "addArticle", //添加文章
  updateArticle: ipUrl + "updateArticle", //更新文章
  getArticleList: ipUrl + "getArticleList", //文章列表
  delArticle: ipUrl + "delArticle/", //删除文章，加个/便于后面直接+id，不用+'/'+id
  getArticleById: ipUrl + "getArticleById/", //根据ID获得文章详情
};

export default servicePath;
