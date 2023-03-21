// 存放前台所有的后台接口
let ipUrl = "http://localhost/default/";

let servicePath = {
  getArticleList: ipUrl + "getArticleList", //首页接口
  getArticleById: ipUrl + "getArticleById", // 详细页接口
  getTypeInfo: ipUrl + "getTypeInfo", //文章类别接口
  getListByTypeId: ipUrl + "getListByTypeId", //根据类别ID获得文章列表
};

export default servicePath;
